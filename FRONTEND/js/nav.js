const triggerAnimation = e => {
    document.querySelector(".navTrigger").classList.toggle("active")
    document.querySelector("#mainListDiv").classList.toggle("show_list");
    document.querySelector(".nav .container").classList.toggle("pointer-show")
}

document.querySelector(".navTrigger").addEventListener("click", triggerAnimation);

const handleNavScroll = e => {
    // console.log(e)
    const scrollTop = document.querySelector("html").scrollTop
    // console.log(scrollTop);
    if(scrollTop <= 50)
        document.querySelector("nav").classList.remove("affix")
    else
        document.querySelector("nav").classList.add("affix")
    
}

window.addEventListener("scroll", handleNavScroll);