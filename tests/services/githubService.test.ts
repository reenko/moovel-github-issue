import GithubService from '../../src/services/githubService';
import ApplicationError from '../../src/errors/applicationError';

// TODO: mock a github api call
describe("Search github users by langs and username", () => {
  test("Correct request with two langs and username", async () => {
    const result = await GithubService.search(['js', 'java'], 'test');
    return expect(10).toBeLessThan(result.meta.total_count);
  });

  test("Correct request without username", async () => {
    const result = await GithubService.search(['js', 'java']);
    return expect(10).toBeLessThan(result.meta.total_count);
  });

  test("Correct request with one expected result", async () => {
    const result = await GithubService.search(['js', 'java'], 'reenko');
    return expect(result.meta.total_count).toBe(1);
  });

  test("Correct request without results - no repos with the lang", async () => {
    const result = await GithubService.search(['go'], 'reenko');
    return expect(result.meta.total_count).toBe(0);
  });

  test("Correct request without results - user doesn't exists", async () => {
    const result = await GithubService.search(['js'], 'reenko123test');
    return expect(result.meta.total_count).toBe(0);
  });

  test("Uncorrect request without langs - test 1", async () => {
    try {
      const result = await GithubService.search([]);
    } catch (e) {
      return expect(e.message).toBe('Request should contain at least one language');
    }
  });

  test("Uncorrect request without langs - test 2", async () => {
    try {
      const result = await GithubService.search(null);
    } catch (e) {
      return expect(e.message).toBe('Request should contain at least one language');
    }
  });
});
