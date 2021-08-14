const params = new URLSearchParams(window.location.search)

document.getElementById('code').innerHTML =  params.get('code')

function info() {
    window.location.href = `/info?code=${params.get('code')}`
}

function del() {
    window.location.href = `/delete?code=${params.get('code')}`
}