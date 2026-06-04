const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    // ... existing code ...
  } catch (error) {
    // ... existing code ...
  }
}
