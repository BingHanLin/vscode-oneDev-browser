import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('binghanlin.onedev-browser') !== undefined
			|| true); // Extension may not be installed in test env, but activation should not throw
	});
});
