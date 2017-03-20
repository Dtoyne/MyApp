const update = document.getElementById('update');
const delete = document.getElementById('delete');

update.addEventListener('click', () => {
  fetch('products', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Spikeball',
      'price': '2.99'
    })
  })
  .then(response => {
    if (response.ok) return response.json();
  })
  .then(data -> {
    console.log(data);
  })
})

delete.addEventListener('click', () => {
  fetch('products', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Spikeball'
    })
  }).then((response) => {
    window.location.reload()
  })
})
