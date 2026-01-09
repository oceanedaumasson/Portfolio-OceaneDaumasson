const prefix = window.location.pathname.includes("/pages/") ? "../" : "";

class MyNav extends HTMLElement {
    connectedCallback() {
    this.innerHTML = `
            <nav class="top-bar">
                <div class="nav-inner">
                    <a href="${prefix}index.html" class="nav-left">OD</a>

                    <div class="nav-right">
                        <a href="${prefix}pages/About.html">ABOUT ME</a>
                        <a href="${prefix}pages/Contact.html">CONTACT</a>
                        <a href="${prefix}pages/MyWork.html">MY WORK</a>
                        <a href="${prefix}pages/Resume.html">RESUME</a>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('my-nav', MyNav)