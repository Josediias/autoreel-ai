export default function handler(req, res) {
  return res.status(200).json({ video_url: 'https://fakevideo.com/video.mp4' });
}