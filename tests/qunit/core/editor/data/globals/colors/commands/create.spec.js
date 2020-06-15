import ElementsHelper from 'elementor-tests-qunit/core/editor/document/elements/helper';
import * as eData from 'elementor-tests-qunit/mock/e-data';

export const Create = () => {
	QUnit.module( 'Create', ( hooks ) => {
		hooks.before( () => {
			eData.mockAdd( 'create', 'globals/colors', ( result, requestData ) => {
				const { query } = requestData.args,
					{ data } = requestData.args;

				return { ... query, ... data };
			} );
			eData.mock();
		} );

		hooks.after( () => {
			eData.mockClear();
			eData.free();
		} );

		QUnit.test( 'Simple', async ( assert ) => {
			// Create widget.
			const eButton = ElementsHelper.createAutoButton(),
				random = Math.random().toString(),
				title = 'title_' + random;

			ElementsHelper.settings( eButton, {
				button_text_color: 'red',
			} );

			const result = await $e.run( 'globals/colors/create', {
				container: eButton,
				setting: 'button_text_color',
				title,
			} );

			assert.equal( result.data.title, title );
			assert.equal( result.data.value, 'red' );
		} );
	} );
};

export default Create;
