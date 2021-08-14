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
        returnText.innerHTML = data.message
        returnText.className += ' text-info'
    })
    .catch((error)=>{
        returnText.innerHTML = 'Some error when delete'
        returnText.className += ' text-danger'
    })
}
