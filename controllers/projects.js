import Project from '../models/Project.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/index.js';

const getAllProjects = async (req, res) => {
  const status = req.params.status;
  const createdBy = req.user.userId;
  const { sort, search } = req.query;

  const queryObject = {};

  if (status) queryObject.status = status;
  if (search) queryObject.projectName = { $regex: search, $options: 'i' };

  let query = Project.find({ createdBy, ...queryObject });

  if (sort) {
    const sortList = sort.split(',').join(' ');
    query = query.sort(sortList);
  }

  const result = await query;

  res.status(StatusCodes.OK).json({ count: result.length, projects: result });
};

const createProject = async (req, res) => {
  const createdBy = req.user.userId;

  const project = await Project.create({ ...req.body, createdBy }, { runValidators: true });
  res.status(StatusCodes.OK).json(project);

  if (!project) {
    throw new BadRequestError('An Error occured while creating the project', StatusCodes.BAD_REQUEST);
  }
};

const updateProject = async (req, res) => {
  const {
    user: { userId },
    params: { id: projectId },
    body: { projectName, description, startDate, img, techStack, githubRepo, liveUrl, status },
  } = req;

  const project = await Project.findByIdAndUpdate({ _id: projectId, createdBy: userId }, { projectName, description, startDate, img, techStack, githubRepo, liveUrl, status }, { new: true, runValidators: true });
  res.status(StatusCodes.OK).json(project);
};

export { getAllProjects, createProject, updateProject };
