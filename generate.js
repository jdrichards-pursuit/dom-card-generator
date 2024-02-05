function generateCardText(description) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate name and description in separate object keys.Limit one name and one description. Limit description to 15 words. ${description}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7 // more deterministic info
    })
  };

  return (
    fetch("https://api.openai.com/v1/chat/completions", options)
      .then((res) => res.json())
      // .then((data) => console.log(JSON.parse(data.choices[0].message.content)));
      .then((data) => JSON.parse(data.choices[0].message.content))
  );
}

function generateCardImage(textDescription) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: textDescription.description,
      n: 1,
      size: "512x512"
    })
  };

  return fetch("https://api.openai.com/v1/images/generations", options)
    .then((res) => res.json())
    .then((res) => res.data[0].url);
}
