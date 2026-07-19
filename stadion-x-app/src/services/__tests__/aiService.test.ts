import { describe, it, expect, vi } from 'vitest';
import { aiService } from '../aiService';

describe('aiService', () => {
  it('should return employee prompts', () => {
    const prompts = aiService.getSuggestedPrompts('employee', '/incidents');
    expect(prompts).toContain("Summarize active incidents");
  });

  it('should return fan prompts', () => {
    const prompts = aiService.getSuggestedPrompts('fan', '/food');
    expect(prompts).toContain("Order me a burger");
  });

  it('should fallback properly for unrecognized employee query', () => {
    const response = aiService._generateResponse('some random query', 'employee');
    expect(response).toContain("Input Data: Unrecognized query string");
  });

  it('should fallback properly for unrecognized fan query', () => {
    const response = aiService._generateResponse('some random query', 'fan');
    expect(response).toContain("I have no idea what you just said");
  });

  it('should stream fallback response properly', async () => {
    const onProgress = vi.fn();
    const result = await aiService.streamARC('tell me a joke', 'fan', onProgress);
    expect(result).toContain('quarter back');
    expect(onProgress).toHaveBeenCalled();
  });
});
