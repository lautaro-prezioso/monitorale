(function () {
  "use strict";
  var C = window.CONFIG || {};
  var DATA = window.PROPIEDADES || [];
  var estado = { op: "todas", tipo: "todos" };

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- Datos de contacto ---------- */
  function cargarContacto() {
    $("f-dir").textContent = C.direccion || "";
    $("f-tel").textContent = C.telefono || "";
    $("f-mail").textContent = C.email || "";
    $("c-dir").textContent = C.direccion || "";
    $("c-tel").textContent = C.telefono || "";
    $("c-mail").textContent = C.email || "";
    $("foot-dir").textContent = C.direccion || "";
    $("anio").textContent = new Date().getFullYear();
    $("c-mapa").href = C.mapa || "#";
    $("c-llamar").href = "tel:" + (C.telefonoLink || "");
    $("c-escribir").href = "mailto:" + (C.email || "");
    if (C.whatsapp) {
      $("c-wa-item").hidden = false;
      $("c-wa").href = "https://wa.me/" + C.whatsapp;
    }
    if (C.instagram) {
      $("c-ig-item").hidden = false;
      $("c-ig").href = C.instagram;
    }
  }

  /* ---------- Utilidades ---------- */
  function precioTexto(p) {
    if (p.precio == null) return { principal: "Consultar", moneda: "" };
    var n = new Intl.NumberFormat("es-AR").format(p.precio);
    return { principal: (p.moneda || "$") + " " + n, moneda: p.nota || "" };
  }

  function consultaHref(p) {
    var msg = "Hola, quisiera consultar por: " + p.titulo + " (" + p.ubicacion + ").";
    if (C.whatsapp) return { href: "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg), texto: "Consultar por WhatsApp", ext: true };
    return { href: "mailto:" + (C.email || "") + "?subject=" + encodeURIComponent("Consulta: " + p.titulo) + "&body=" + encodeURIComponent(msg), texto: "Consultar por mail", ext: false };
  }

  function placeholder(p) {
    var d = el("div", "ph");
    d.appendChild(el("span", null, "Fotos próximamente"));
    return d;
  }

  function imagen(src, p, visor) {
    var img = new Image();
    img.alt = p.titulo + ", " + p.ubicacion;
    img.loading = "lazy";
    img.src = encodeURI(src);
    img.onerror = function () {
      if (img.parentNode) img.parentNode.replaceChild(placeholder(p), img);
    };
    return img;
  }

  /* ---------- Tarjeta ---------- */
  function tarjeta(p) {
    var card = el("article", "card");

    var visor = el("div", "visor");
    var fotos = (p.fotos || []).slice();
    if (fotos.length) visor.appendChild(imagen(fotos[0], p, visor));
    else visor.appendChild(placeholder(p));
    visor.appendChild(el("span", "etiqueta", p.operacion === "alquiler" ? "Alquiler" : "Venta"));
    if (p.destacada) visor.appendChild(el("span", "etiqueta dest", "Destacada"));
    card.appendChild(visor);

    if (fotos.length > 1) {
      var minis = el("div", "miniaturas");
      fotos.forEach(function (f, i) {
        var b = el("button", "mini");
        b.type = "button";
        b.setAttribute("aria-label", "Ver foto " + (i + 1));
        b.setAttribute("aria-current", i === 0 ? "true" : "false");
        var t = new Image(); t.alt = ""; t.src = encodeURI(f);
        t.onerror = function () { b.hidden = true; };
        b.appendChild(t);
        b.addEventListener("click", function () {
          var actual = visor.querySelector("img, .ph");
          var nueva = imagen(f, p, visor);
          visor.replaceChild(nueva, actual);
          Array.prototype.forEach.call(minis.children, function (m) { m.setAttribute("aria-current", "false"); });
          b.setAttribute("aria-current", "true");
        });
        minis.appendChild(b);
      });
      card.appendChild(minis);
    }

    var body = el("div", "card-body");
    var ubic = el("div", "ubic");
    ubic.appendChild(el("span", "cruce"));
    ubic.appendChild(el("span", null, p.ubicacion));
    body.appendChild(ubic);
    body.appendChild(el("h3", null, p.titulo));

    var pr = precioTexto(p);
    var precio = el("div", "precio", pr.principal);
    if (pr.moneda) precio.appendChild(el("small", null, pr.moneda));
    body.appendChild(precio);

    if (p.descripcion) body.appendChild(el("p", "desc", p.descripcion));
    if (p.caracteristicas && p.caracteristicas.length) {
      var ul = el("ul", "tags");
      p.caracteristicas.forEach(function (c) { ul.appendChild(el("li", null, c)); });
      body.appendChild(ul);
    }

    var foot = el("div", "card-foot");
    var q = consultaHref(p);
    var a = el("a", "btn btn-primary", q.texto);
    a.href = q.href;
    if (q.ext) { a.target = "_blank"; a.rel = "noopener"; }
    foot.appendChild(a);
    body.appendChild(foot);

    card.appendChild(body);
    return card;
  }

  /* ---------- Listado y filtros ---------- */
  function render() {
    var lista = $("lista");
    lista.textContent = "";
    var filtradas = DATA.filter(function (p) {
      return (estado.op === "todas" || p.operacion === estado.op) &&
             (estado.tipo === "todos" || p.tipo === estado.tipo);
    });
    filtradas.sort(function (a, b) { return (b.destacada ? 1 : 0) - (a.destacada ? 1 : 0); });
    filtradas.forEach(function (p) { lista.appendChild(tarjeta(p)); });
    $("vacio").hidden = filtradas.length > 0;
    $("contador").textContent = filtradas.length === 1 ? "1 propiedad" : filtradas.length + " propiedades";
  }

  function iniciarFiltros() {
    var chips = document.querySelectorAll("#chips-operacion .chip");
    Array.prototype.forEach.call(chips, function (c) {
      c.addEventListener("click", function () {
        estado.op = c.getAttribute("data-op");
        Array.prototype.forEach.call(chips, function (x) {
          x.setAttribute("aria-pressed", x === c ? "true" : "false");
        });
        render();
      });
    });
    $("filtro-tipo").addEventListener("change", function (e) {
      estado.tipo = e.target.value;
      render();
    });
  }

  cargarContacto();
  iniciarFiltros();
  render();
})();
