const params = new URLSearchParams(window.location.search)
const code = params.get('code')

document.getElementById('ok').style.display = 'none'
document.getElementById('error').style.display = 'none'

function renderPost(post) {
    document.getElementById('ok').style.display = 'block'
    document.getElementById('text').innerText = post.text
    document.getElementById('time_format').innerText += post.time_format
    if (post.approved) {
        document.getElementById('approved').innerText += '<i class="fa fa-check" style="color:green;"></i>'
    }
    else {
        document.getElementById('approved').innerText += '<i class="fa fa-lock" style="color:red;"></i>'
    }
    if (post.label == "Câu bình thường"){
        document.getElementById('label').innerText += '<i class="fa fa-check" style="color:green;"></i>'
    } else {
        document.getElementById('label').innerText += '<i class="fa fa-exclamation" style="color:red;"></i>'
    }
    document.getElementById('label').innerText += ' ' + post.accuracy  + '%'
    
}

function renderError(error){
    document.getElementById('error').style.display = 'block'
    document.getElementById('error_value').innerText = error.message
}
fetch(`api/post/info/${code}`, {
    method: 'GET',
    headers: { 'Content-Type' : 'application/json'}
})
.then((res)=>{
    return res.json()
})
.then((data)=>{
    if (data._id) 
    renderPost(data)
    else renderError(data)
})
.catch((error)=>{

})