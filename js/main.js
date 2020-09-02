//Article Class
class Article {

    constructor(title = "", content = "") {
        this.id = this.getID();
        this.title = title;
        this.content = content;
        this.date = this.getDate();
        this.pushToArticleObjectArrays();
    }

    getID() {
        return articleObjectArrays.length + 1; //Assign id Based On The articleObjectArrays length
    }

    getDate() {
        //Date.prototype.toLocaleDateString() with options
        //URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        const now = new Date();
        return now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    pushToArticleObjectArrays() {
        articleObjectArrays.push(this); //Push Article to articleObjectArrays
    }

    output() {
        const arrayIndex = articleObjectArrays.indexOf(this); //Get the Array Index from articleObjectArrays

        //Output Article to DOM Blog Titles
        const titleNavigationUl = document.querySelector("header > nav > ul"); //Get DOM for Blog Titles in UL
        const a = document.createElement("a"); //Create DOM for a
        const li = document.createElement("li"); //Create DOM for li
        a.textContent = `${this.title}`; //Add title to a
        a.setAttribute("href", `#blog-${this.id}`); //Add id to a href
        li.appendChild(a); //Append a as Child of li
        titleNavigationUl.appendChild(li); //Append li to titleNavigationUl

        //Output Article to DOM Blog Posts
        const blogArticlesSections = document.querySelector("main > article"); //Get DOM for Blog Articles in Article
        const section = document.createElement("section"); //Create DOM for section
        const h2 = document.createElement("h2"); //Create DOM for h2
        const span = document.createElement("span"); //Create DOM for span
        const buttonEdit = document.createElement("button"); //Create DOM for button
        const buttonDelete = document.createElement("button"); //Create DOM for button
        const p = document.createElement("p"); //Create DOM for p
        h2.textContent = `${this.title}`; //Add title to h2
        span.textContent = `${this.date}`; //Add date to span
        buttonEdit.textContent = "Edit"; //Add title to button
        buttonEdit.setAttribute("array-index", `${arrayIndex}`); //Add array-index to button DOM to enable editBlogPost
        buttonEdit.addEventListener("click", Blog.editBlogPost); //Add Event Listener to Edit button
        buttonDelete.textContent = "Delete"; //Add title to button
        buttonDelete.setAttribute("array-index", `${arrayIndex}`); //Add array-index to button DOM to enable deleteBlogPost
        buttonDelete.addEventListener("click", Blog.deleteBlogPost); //Add Event Listener to Delete button
        p.textContent = `${this.content}`; //Add content to p
        section.setAttribute("id", `blog-${this.id}`); //Add id to section id
        section.appendChild(h2); //Append all to section
        section.appendChild(span);
        section.appendChild(buttonEdit);
        section.appendChild(buttonDelete);
        section.appendChild(p);
        blogArticlesSections.appendChild(section); //Append section to blogArticlesSections
    }

}

//Blog Class
class Blog {

    static loadArticlesFromJSON = (data = articles) => {
        const articlesJSON = JSON.parse(data);
        for (const article of articlesJSON.articles) {
            const articleObject = new Article(article.title, article.content); //Create Object from Article Class
        }
        this.loadBlogTitlesAndArticles(articleObjectArrays); //Load loadBlogTitlesAndArticles Method To Load Blog Articles
    };

    static loadBlogTitlesAndArticles = (data = articleObjectArrays) => {
        this.resetDom(); //Reset DOM

        //Sort articleObjectArrays in Descending Order
        articleObjectArrays.sort( function(a,b) {
            return b.id - a.id;
        });
        for (const articleObject of articleObjectArrays) {
            articleObject.output(); //Call the Article.output() Class Method
        }
    };

    static resetDom = () => {
        //Remove All Dynamically Added Content
        const titleNavigationUl = document.querySelectorAll("header > nav > ul > li:not(.pre-loaded)"); //Get DOM for Blog Titles in UL > LI without Class pre-loaded to Remove
        for (const titleLi of titleNavigationUl) {
            titleLi.remove();
        }
        const blogArticlesSections = document.querySelectorAll("main > article > section:not(.pre-loaded)"); //Get DOM for Blog Articles in Article > Section without Class pre-loaded to Remove
        for (const blogArticlesSection of blogArticlesSections) {
            blogArticlesSection.remove();
        }
    }

    static editBlogPost = (event) => {
        const arrayIndex = event.target.getAttribute("array-index"); //Get Attribute of array-index
    
        //Prompt for Updates
        const title = prompt("Blog Title");
        const content = prompt("Blog Content");
    
        //Update articleObjectArrays
        articleObjectArrays[arrayIndex].title = title;
        articleObjectArrays[arrayIndex].content = content;
    
        this.loadBlogTitlesAndArticles(articleObjectArrays); //Load loadBlogTitlesAndArticles Method To Load Blog Articles
    }

    static deleteBlogPost = (event) => {
        const arrayIndex = event.target.getAttribute("array-index"); //Get Attribute of array-index
        articleObjectArrays.splice(arrayIndex, 1); //Remove Array at arrayIndex
        this.loadBlogTitlesAndArticles(articleObjectArrays); //Load loadBlogTitlesAndArticles Method To Load Blog Articles
    }

    static addNewBlogPost = (event) => {
        event.preventDefault(); //Prevent Form Refresh
        const newArticleTitle = document.querySelector("section:nth-of-type(1) > form > input[id=title]");
        const newArticleContent = document.querySelector("section:nth-of-type(1) > form > textarea[id=content]");
        const articleObject = new Article(newArticleTitle.value, newArticleContent.value); //Create Object from Article Class
        addNewBlogPostForm.reset(); //Reset Form
        this.loadBlogTitlesAndArticles(articleObjectArrays); //Load loadBlogTitlesAndArticles Method To Load Blog Articles
    }

}

//JSON from ../json/articles.json
//JSON.parse variable string needs to double escape the escaped quotes using '\\' for '\'
const articles = `{
    "articles": [
      { "id": 1, "title": "HTML5", "content": "HyperText Markup Language (version 5.)" },
      { "id": 2, "title": "CSS3", "content": "Cascading StyleSheets (version 3.)" },
      { "id": 3, "title": "Bootstrap", "content": "Bootstrap is a CSS framework, offering you a cornucopia of pre-set classes and styles out-of-the-box." },
      { "id": 4, "title": "Foundation", "content": "Foundation is a CSS framework, offering you a cornucopia of pre-set classes and styles out-of-the-box." },
      { "id": 5, "title": "Bulma", "content": "Bulma is a CSS framework, offering you a cornucopia of pre-set classes and styles out-of-the-box." },
      { "id": 6, "title": "Semantic UI", "content": "Foundation is a CSS framework, offering you a cornucopia of pre-set classes and styles out-of-the-box." },
      { "id": 7, "title": "JavaScript", "content": "Used for functionality, and handling of interactivity, in the front-end of websites." },
      { "id": 8, "title": "ECMAScript 6", "content": "A specific version of JavaScript that introduces new features like \\"class\\" arrow-style function." },
      { "id": 9, "title": "jQuery", "content": "A library intended to assist with backwards compatability, ease of JavaScript plugin creation, and simplification of code." },
      { "id": 10, "title": "Slick", "content": "A JavaScript library for easy sliders." },
      { "id": 11, "title": "ChartJS", "content": "A JavaScript library for easy charts." },
      { "id": 12, "title": "Axios", "content": "A JavaScript library for easy AJAX requests." },
      { "id": 13, "title": "TypeScript", "content": "A superset of JavaScript with enhanced types." },
      { "id": 14, "title": "React", "content": "A JavaScript library for managing the interactive \\"view\\" layer of a website application." },
      { "id": 15, "title": "Redux", "content": "When \\"local\\" state isn't enough, Redux provides a more \\"global\\" solution." },
      { "id": 16, "title": "PHP", "content": "PHP Hypertext Preprocessor language is used as a general-purpose and website application (server-side) solution." },
      { "id": 17, "title": "WordPress", "content": "The leading blogging platform on the web, powering more than 30% of websites; built in PHP." },
      { "id": 18, "title": "Databases", "content": "Used as a persistant storage solution, typically for web or software solutions." },
      { "id": 19, "title": "MySQL", "content": "A database management system utilizing an \\"Structured Query Language\\" for request formatting." },
      { "id": 20, "title": "C#", "content": "A programming language typically utilized for native desktop software or website applications." },
      { "id": 21, "title": ".NET CORE", "content": "A C# framework developed by Microsoft for accelerated web and desktop application development." }
    ]
}`;

//Declare Constant(s)
const articleObjectArrays = new Array(); //Array of Article Objects

//Load Default Articles
Blog.loadArticlesFromJSON(articles);

//Add Event Listener to Form
const addNewBlogPostForm = document.querySelector("section:nth-of-type(1) > form");
addNewBlogPostForm.addEventListener("submit", Blog.addNewBlogPost);