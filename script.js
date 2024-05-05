function submitLivestockData() {
    const animalId = document.getElementById('animalId').value;
    const temperature = parseFloat(document.getElementById('temperature').value);
    const pulseRate = parseInt(document.getElementById('pulseRate').value);
    const heartRate = parseInt(document.getElementById('heartRate').value);
  
    const data = {
      animalId,
      temperature,
      pulseRate,
      heartRate
    };
  
    fetch('/api/livestock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert('Livestock data submitted successfully');
        location.reload(); // Refresh page after submission (optional)
      } else {
        throw new Error('Failed to submit livestock data');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while submitting livestock data');
    });
  }
  