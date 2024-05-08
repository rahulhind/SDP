// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   name: { type: String },
//   avatar: { type: String },
//   settings: {
//     notifications: { type: Boolean, default: true },
//     privacy: { type: String, default: 'public' }, // could be 'public', 'friends', 'private'
//     chatPreferences: { type: String, default: 'random' } // could be 'random', 'same_interests', etc.
//   }
// });

// export default mongoose.models.User || mongoose.model('User', userSchema);

// import mongoose, { Document, Model } from 'mongoose';

// interface IUser extends Document {
//   email: string;
//   name?: string;
//   avatar?: string;
//   settings?: {
//     notifications: boolean;
//     privacy: string;
//     chatPreferences: string;
//   };
// }

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   name: { type: String },
//   avatar: { type: String },
//   settings: {
//     notifications: { type: Boolean, default: true },
//     privacy: { type: String, default: 'public' },
//     chatPreferences: { type: String, default: 'random' }
//   }
// });

// const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// export default User;

// Assuming this file is located at /models/User.ts

import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
  email: string;
  name?: string;
  avatar?: string;
  settings?: {
    notifications: boolean;
    privacy: string;
    chatPreferences: string;
  };
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, optional: true },
  avatar: { type: String, optional: true },
  settings: {
    notifications: { type: Boolean, default: true },
    privacy: { type: String, default: 'public' },
    chatPreferences: { type: String, default: 'random' }
  }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
export type { IUser as UserType }; // Exporting UserType for use elsewhere
