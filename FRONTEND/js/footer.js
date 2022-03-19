const handleFooterScroll = e => {
    // console.log(e)
    const scrollTop = document.querySelector("html").scrollTop
    // console.log(scrollTop);
    if(scrollTop <= 50)
        document.querySelector("footer").classList.remove("footer-affix")
    else
        document.querySelector("footer").classList.add("footer-affix")
    
}

window.addEventListener("scroll", handleFooterScroll);