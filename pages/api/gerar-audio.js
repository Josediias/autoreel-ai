export default function handler(req, res) {
  return res.status(200).json({ audio_url: 'https://fakeaudio.com/audio.mp3' });
}