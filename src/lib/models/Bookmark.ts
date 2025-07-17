import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  userId: String,
  url: String,
  title: String,
  favicon: String,
  summary: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bookmark || mongoose.model('Bookmark', BookmarkSchema);
