const prefix = window.location.pathname.includes("/pages/") ? "../" : "";

class MyNav extends HTMLElement {
    connectedCallback() {
        // This checks if page is work page (needs light navbar), changes accordingly
        const isWorkPage = document.body.classList.contains('work-pages')
        const navClass = isWorkPage ? 'top-bar light-nav' : 'top-bar';

    this.innerHTML = `
            <nav class="${navClass}"> 
                <div class="nav-inner">
                    <a href="${prefix}index.html" class="nav-left">OD</a>

                    <div class="nav-right">
                        <a href="${prefix}index.html#about_id">ABOUT ME</a>
                        <a href="${prefix}pages/MyWork.html">MY WORK</a>
                        <a href="${prefix}pages/TEMP.pdf" target="_blank">RESUME</a>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('my-nav', MyNav)