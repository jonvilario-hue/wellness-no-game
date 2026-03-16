
import { renderValueForLanguage } from '../renderers';

describe('Language-Aware Renderers', () => {
  it('formats null correctly per language', () => {
    expect(renderValueForLanguage('python', null)).toBe('None');
    expect(renderValueForLanguage('go', null)).toBe('nil');
    expect(renderValueForLanguage('sql', null)).toBe('NULL');
    expect(renderValueForLanguage('bash', null)).toBe('""');
    expect(renderValueForLanguage('javascript', null)).toBe('null');
  });

  it('formats booleans correctly per language', () => {
    expect(renderValueForLanguage('python', true)).toBe('True');
    expect(renderValueForLanguage('bash', true)).toBe('0'); // Exit code success
    expect(renderValueForLanguage('bash', false)).toBe('1'); // Exit code fail
    expect(renderValueForLanguage('sql', true)).toBe('TRUE');
    expect(renderValueForLanguage('javascript', true)).toBe('true');
  });

  it('quotes strings correctly per language', () => {
    expect(renderValueForLanguage('sql', "O'Reilly")).toBe("'O''Reilly'");
    expect(renderValueForLanguage('python', "hello")).toBe('"hello"');
  });

  it('avoids quoting for identifiers', () => {
    expect(renderValueForLanguage('javascript', "myVar", 'identifier')).toBe('myVar');
  });
});
