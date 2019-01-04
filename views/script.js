

function showPosts(){
    console.log('prefetch')
   fetch('/postStore')
   .then(res => console.log(res))
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

