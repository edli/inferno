import { render } from './../../DOM/rendering';
import Router from '../Router';
import Route from '../Route';
import browserHistory from '../browserHistory';
import { createBlueprint } from './../../core/createBlueprint';

const Inferno = {
	createBlueprint
};

function TestComponent() {
	return <div>Test!</div>;
}

function TestComponentParams({ params }) {
	return <div>Test! { params.test }</div>;
}

function createRouterWithSingleRoute(url, path, component) {
	return (
		<Router url={ url } history={ browserHistory }>
			<Route path={ path } component={ component } />
		</Router>
	);
}

describe('Router tests (jsx)', () => {
	let container;

	beforeEach(() => {
		container = document.createElement('div');
	});

	afterEach(() => {
		container.innerHTML = '';
	});

    describe('with browser history', () => {
		describe('and with no wrapper component', () => {
			it('it should render the TestComponent with given paths', () => {
				render(
					createRouterWithSingleRoute('/', '/', TestComponent),
					container
				);
				expect(container.innerHTML).to.equal('<div>Test!</div>');

				render(
					createRouterWithSingleRoute('/foo', '/foo', TestComponent),
					container
				);
				expect(container.innerHTML).to.equal('<div>Test!</div>');

				render(
					createRouterWithSingleRoute('/foo/bar/yar', '*', TestComponent),
					container
				);
				expect(container.innerHTML).to.equal('<div>Test!</div>');

				render(
					createRouterWithSingleRoute('/foo/bar', '/foo/*', TestComponent),
					container
				);
				expect(container.innerHTML).to.equal('<div>Test!</div>');
			});
			it('it should render the TestComponent with given paths (and params)', () => {
				render(
					createRouterWithSingleRoute('/foo', '/:test', TestComponentParams),
					container
				);
				expect(container.innerHTML).to.equal('<div>Test! foo</div>');

				render(
					createRouterWithSingleRoute('/foo/bar', '/foo/:test', TestComponentParams),
					container
				);
				expect(container.innerHTML).to.equal('<div>Test! bar</div>');

				render(
					createRouterWithSingleRoute('/foo/bar/yar', '/foo/bar/:test', TestComponentParams),
					container
				);
				expect(container.innerHTML).to.equal('<div>Test! yar</div>');
			});    			
		});
    })
});