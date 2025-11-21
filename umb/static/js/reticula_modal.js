(function () {
    function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
    function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

    function openModal(pdfPath) {
        const modal = qs('#reticulaModal');
        if (!modal) return;
        const frame = qs('#reticulaFrame', modal);
        const download = qs('#reticulaDownload', modal);
        frame.src = pdfPath;
        download.href = pdfPath;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        // focus close for accessibility
        const closeBtn = qs('.reticula-close', modal);
        if (closeBtn) closeBtn.focus();
        document.addEventListener('keydown', escListener);
    }

    function closeModal() {
        const modal = qs('#reticulaModal');
        if (!modal) return;
        const frame = qs('#reticulaFrame', modal);
        frame.src = '';
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', escListener);
    }

    function escListener(e) { if (e.key === 'Escape') closeModal(); }

    function init() {
        qsa('.reticula-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const pdf = btn.getAttribute('data-reticula');
                if (!pdf) {
                    window.alert('Archivo de retícula no disponible.');
                    return;
                }
                openModal(pdf);
            });
        });

        qsa('[data-close]').forEach(el => {
            el.addEventListener('click', closeModal);
        });
    }

    if (document.readyState !== 'loading') init();
    else document.addEventListener('DOMContentLoaded', init);
})();
