import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, 'Please provide a Project Name!'],
      maxlength: 50,
    },

    description: {
      type: String,
      required: [true, 'Please provide a Project description!'],
      // maxlength: 100,
    },

    startDate: {
      type: Date,
      required: [true, 'Please provide a start date!'],
      // enum: ['interview', 'declined', 'pending'],
      default: Date.now(),
    },

    img: {
      type: String,
      required: [true, 'Please provide a image!'],
    },

    techStack: {
      type: Array,
      required: [true, 'Please provide at least one technology!'],
    },

    githubRepo: {
      type: String,
      required: [true, 'Please provide a GitHub Link!'],
      // maxlength: 100,
    },

    liveUrl: {
      type: String,
      required: [true, 'Please provide a live url!'],
    },

    status: {
      type: String,
      required: [true, 'Please provide a status!'],
      enum: ['current', 'archived', 'completed'],
      default: 'current',
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user!'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);
