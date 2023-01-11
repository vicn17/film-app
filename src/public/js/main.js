const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const Lis = $$('.navigation__list ul li');
const tabs = $$(".tab-pane");
const panes = $$(".tab-item");


const myAdmin = {
    handleEvents: function() {
        tabs.forEach((tab, index) => {
            const pane = panes[index];
            tab.onclick = function() {
                $('.tab-item.active').classList.remove('active');
                $('.tab-pane.active').classList.remove('active');
                this.classList.add('active');
                pane.classList.add('active');
            }
        })
        const removeActiveClasses = () => {
            Lis.forEach(li => {
                li.classList.remove('active')
            })
        }
        Lis.forEach((li) => {
            li.addEventListener('click', () => {
                removeActiveClasses();
                li.classList.add('active')
            })
        })
    },

    start: function() {
        this.handleEvents()
    }
}
myAdmin.start()








