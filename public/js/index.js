function resetInput() {
    let messageInput = document.getElementById('message')
    let button = document.getElementById('btn')
    button.disabled = false
    messageInput.disabled = false
}
function submitClick() {
    let messageInput = document.getElementById('message')
    let button = document.getElementById('btn')
    button.disabled = true
    // messageInput.disabled = true
    const data = { 
        text: messageInput.value
    }
    messageInput.value = ''
    fetch('/api/post/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        if (data.id) {
            window.location.href = `/complete?code=${data.id}`
        } else {
            alert('Error')
            resetInput()
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}