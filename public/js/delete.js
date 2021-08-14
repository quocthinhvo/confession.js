const params = new URLSearchParams(window.location.search)
const code = params.get('code')    
let returnText = document.getElementById('code')
let idValue = document.getElementById('postid')
idValue.value = code

function del(){
   
    fetch(`api/post/delete/${idValue.value}`, {
        method: 'DELETE',
        headers: { 'Content-Type' : 'application/json'}
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        returnText.innerText = data.message
        returnText.className += ' text-dark'
    })
    .catch((error)=>{
        returnText.innerText = 'Unknow error when delete'
        returnText.className += ' text-danger'
    })
}
