import express from 'express';
const router = express.Router();

import { getAllProjects, createProject, updateProject } from '../controllers/projects.js';

router.route('/').post(createProject);
router.get('/:status', getAllProjects);
router.route('/:id').patch(updateProject);

export default router;
