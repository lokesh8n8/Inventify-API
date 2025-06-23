const {
  getTags,
  getChallengeOfTheDay,
  getTopRatedChallenges,
  getChallengesByTag,
  getAllChallenges,
  getRandomChallenge,
  getChallengeRatings,
  rateChallenge,
} = require('../../controllers/challengeController');

const Challenge = require('../../models/Challenge');
const Rating = require('../../models/Rating');

jest.mock('../../models/Challenge');
jest.mock('../../models/Rating');

describe('Unit Tests for challengeController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTags', () => {
    it('should return a list of tags', async () => {
      Challenge.distinct.mockResolvedValue(['js', 'algos']);
      const req = {};
      const res = { json: jest.fn() };

      await getTags(req, res);
      expect(res.json).toHaveBeenCalledWith(['js', 'algos']);
    });

    it('should handle errors', async () => {
      Challenge.distinct.mockRejectedValue(new Error('DB error'));
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getTags(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('getChallengeOfTheDay', () => {
    it('should return the featured challenge', async () => {
      Challenge.findOne.mockResolvedValue({ title: 'Challenge' });
      const req = {};
      const res = { json: jest.fn() };

      await getChallengeOfTheDay(req, res);
      expect(res.json).toHaveBeenCalledWith({ title: 'Challenge' });
    });

    it('should return empty object if not found', async () => {
      Challenge.findOne.mockResolvedValue(null);
      const req = {};
      const res = { json: jest.fn() };

      await getChallengeOfTheDay(req, res);
      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe('getTopRatedChallenges', () => {
    it('should return top-rated challenges', async () => {
      Rating.aggregate.mockResolvedValue([{ _id: '1', avgRating: 4.8 }]);
      const req = {};
      const res = { json: jest.fn() };

      await getTopRatedChallenges(req, res);
      expect(res.json).toHaveBeenCalledWith([{ _id: '1', avgRating: 4.8 }]);
    });
  });

  describe('getChallengesByTag', () => {
    it('should return challenges for tag', async () => {
      Challenge.find.mockResolvedValue([{ title: 'tagged challenge' }]);
      const req = { query: { tag: 'js' } };
      const res = { json: jest.fn() };

      await getChallengesByTag(req, res);
      expect(res.json).toHaveBeenCalledWith([{ title: 'tagged challenge' }]);
    });

    it('should return 400 if tag is missing', async () => {
      const req = { query: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getChallengesByTag(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Missing ?tag=' });
    });
  });

  describe('getAllChallenges', () => {
    it('should return all challenges', async () => {
      Challenge.find.mockResolvedValue([{ title: 'all' }]);
      const req = {};
      const res = { json: jest.fn() };

      await getAllChallenges(req, res);
      expect(res.json).toHaveBeenCalledWith([{ title: 'all' }]);
    });
  });

  describe('getRandomChallenge', () => {
    it('should return a random challenge with ratings', async () => {
      const mockChallenge = {
        _id: 'abc123',
        title: 'Random',
        toObject: () => ({ _id: 'abc123', title: 'Random' })
      };

      Challenge.countDocuments.mockResolvedValue(5);
      Challenge.findOne.mockReturnValue({ skip: jest.fn().mockResolvedValue(mockChallenge) });
      Rating.aggregate.mockResolvedValue([{ avgRating: 4.5, ratingCount: 2 }]);

      const req = { query: {} };
      const res = { json: jest.fn() };

      await getRandomChallenge(req, res);

      expect(res.json).toHaveBeenCalledWith({
        _id: 'abc123',
        title: 'Random',
        avgRating: 4.5,
        ratingCount: 2
      });
    });

    it('should return 404 if no challenge exists', async () => {
      Challenge.countDocuments.mockResolvedValue(0);
      const req = { query: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getRandomChallenge(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No challenges found' });
    });

    it('should handle DB errors', async () => {
      Challenge.countDocuments.mockRejectedValue(new Error('fail'));
      const req = { query: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getRandomChallenge(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'fail' });
    });
  });

  describe('rateChallenge', () => {
    it('should create and return a new rating', async () => {
      const mockRating = { challengeId: 'abc', rating: 5, comment: 'Cool' };
      Rating.create.mockResolvedValue(mockRating);

      const req = { params: { id: 'abc' }, body: { rating: 5, comment: 'Cool' } };
      const res = { json: jest.fn() };

      await rateChallenge(req, res);
      expect(Rating.create).toHaveBeenCalledWith(mockRating);
      expect(res.json).toHaveBeenCalledWith(mockRating);
    });

    it('should handle DB errors', async () => {
      Rating.create.mockRejectedValue(new Error('fail'));
      const req = { params: { id: 'abc' }, body: { rating: 5, comment: 'Cool' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await rateChallenge(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'fail' });
    });
  });

  describe('getChallengeRatings', () => {
    it('should return average rating and total count', async () => {
      Rating.aggregate.mockResolvedValue([{ avgRating: 4.2, total: 3 }]);
      const req = { params: { id: '507f1f77bcf86cd799439011' } };
      const res = { json: jest.fn() };

      await getChallengeRatings(req, res);
      expect(res.json).toHaveBeenCalledWith({ avgRating: 4.2, total: 3 });
    });

    it('should return default values if no ratings', async () => {
      Rating.aggregate.mockResolvedValue([]);
      const req = { params: { id: '507f1f77bcf86cd799439011' } };
      const res = { json: jest.fn() };

      await getChallengeRatings(req, res);
      expect(res.json).toHaveBeenCalledWith({ avgRating: 0, total: 0 });
    });
  });
});
