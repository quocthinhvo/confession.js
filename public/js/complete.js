const params = new URLSearchParams(window.location.search)

document.getElementById('code').innerText =  params.get('code')

function info() {
    window.location.href = `/info?code=${params.get('code')}`
}

function del() {
    window.location.href = `/delete?code=${params.get('code')}`
}

function copyId(){
  var copyText =  params.get('code')

  navigator.clipboard.writeText(copyText).then(function() {
    document.getElementById('copybtn').innerText = "Copied"
    document.getElementById('copybtn').disabled = true
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}