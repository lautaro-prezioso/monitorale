"""Avisa por notificación al celu (via ntfy.sh) cuando cambia la página de ofertas ALE.

Uso: NTFY_TOPIC=tu-topic-secreto python monitor.py
Guarda el último estado en state.txt y compara contra eso.
"""
import difflib
import html
import os
import re
import sys
import urllib.request

URLS = [
    "https://www.econ.unicen.edu.ar/alumnos/ale/ofertas-ale-y-optativas",
    "https://www.econ.unicen.edu.ar/alumnos/ale/ofertas-ale-y-optativas?page=1",
]
STATE_FILE = "state.txt"
TOPIC = os.environ.get("NTFY_TOPIC", "")


def fetch_text(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (monitor-ale)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        raw = r.read().decode("utf-8", errors="replace")
    raw = re.sub(r"(?is)<(script|style|noscript|header|footer|nav)\b.*?</\1>", " ", raw)
    raw = re.sub(r"(?s)<!--.*?-->", " ", raw)
    raw = re.sub(r"(?i)<br\s*/?>|</(p|div|li|h\d|tr|article|section)>", "\n", raw)
    raw = re.sub(r"(?s)<[^>]+>", " ", raw)
    raw = html.unescape(raw)
    lines = [re.sub(r"\s+", " ", l).strip() for l in raw.split("\n")]
    lines = [l for l in lines if l]
    # Quedarse con el listado de ofertas si se pueden ubicar los marcadores
    text = "\n".join(lines)
    start = text.find("Buscar por Nombre")
    end = text.find("Paginación")
    if start != -1 and end != -1 and end > start:
        text = text[start:end]
    return text


def notify(title, body, url):
    if not TOPIC:
        print("Falta NTFY_TOPIC; no se envía notificación.")
        return
    req = urllib.request.Request(
        f"https://ntfy.sh/{TOPIC}",
        data=body.encode("utf-8"),
        headers={"Title": title, "Click": url, "Tags": "bell"},
        method="POST",
    )
    urllib.request.urlopen(req, timeout=30)


def main():
    current = "\n=====PAGINA=====\n".join(fetch_text(u) for u in URLS)

    if not os.path.exists(STATE_FILE):
        open(STATE_FILE, "w", encoding="utf-8").write(current)
        print("Primer ejecución: estado guardado, sin notificación.")
        return 0

    previous = open(STATE_FILE, encoding="utf-8").read()
    if previous == current:
        print("Sin cambios.")
        return 0

    diff = list(difflib.unified_diff(previous.splitlines(), current.splitlines(), lineterm="", n=0))
    added = [l[1:] for l in diff if l.startswith("+") and not l.startswith("+++")]
    removed = [l[1:] for l in diff if l.startswith("-") and not l.startswith("---")]

    partes = []
    if added:
        partes.append("Nuevo/cambiado: " + " | ".join(added)[:300])
    if removed:
        partes.append("Quitado: " + " | ".join(removed)[:150])
    body = "\n".join(partes) or "La página cambió."

    notify("Cambio en ofertas ALE", body, URLS[0])
    open(STATE_FILE, "w", encoding="utf-8").write(current)
    print("Cambio detectado y notificado.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
