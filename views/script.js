

function showPosts(){
    console.log('prefetch')
   fetch('/blog-posts', {method:  "get"})
   .then(res => res.json())
   .then(resj => console.log(resj))
}


function watchForm() {
    $('.post-form').on('click', '.form-submit', function(e) {
        e.preventDefault();
        console.log($('.post-input').val())
        
    }) 
}
$(document).ready(function(){
    
    showPosts();
    watchForm();


})

