import * as assert from 'assert';
import * as vscode from 'vscode';
import { MacroParser } from '../core/utils/macro-parser';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('parser keeps plain text unchanged', () => {
		const parser = new MacroParser();

		assert.strictEqual(parser.parse('hello world'), 'hello world');
	});

	test('parser replaces macro content', () => {
		const parser = new MacroParser();

		assert.strictEqual(parser.parse('hello $name$'), 'hello 114514');
	});

	test('parser restores escaped dollar signs', () => {
		const parser = new MacroParser();

		assert.strictEqual(parser.parse('price is \\$10'), 'price is $10');
	});

	test('parser throws on unmatched dollar sign', () => {
		const parser = new MacroParser();

		assert.throws(
			() => parser.parse('hello $name'),
			/Format error: unmatched \$/
		);
	});
});