import type { Feature } from 'geojson';
import type { HTMLInputAttributes, HTMLSelectAttributes } from 'svelte/elements';

import { formFields } from '$lib';

function spreadAttributes(attributes: HTMLInputAttributes | HTMLSelectAttributes) {
	return Object.entries(attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(' ');
}

function createFormFields(fields: Record<string, unknown>) {
	const data = Object.entries(formFields).map(([key, value]) => {
		if (value.type === 'select') {
			return `
				<div>
					<label class="block min-w-max font-semibold text-slate-500 text-sm leading-relaxed pl-1" for="${key}">${key}</label>
					<select class="h-9 w-full py-1.5 px-3 rounded-md border border-slate-300 text-sm" id="${key}" name="${key}" ${spreadAttributes(value.attributes)}>
						<option value="" disabled selected>Seleccione ${key}</option>
						${value.options.map((option) => `<option value="${option}" ${option === fields[key] && `selected`}>${option}</option>`).join('')}
					</select>
				</div>
			`;
		} else {
			return `
				<div>
					<label class="block min-w-max font-semibold text-slate-500 text-sm leading-relaxed pl-1" for="${key}">${key}</label>
					<input class="h-9 w-full py-1.5 px-3 rounded-md border border-slate-300 text-sm ${value.type === `text` && `read-only:cursor-not-allowed`} read-only:select-none read-only:bg-slate-100 read-only:text-neutral-600" type="${value.type}" id="${key}" name="${key}" value="${fields[key] || value.defaultValue}" ${spreadAttributes(value.attributes)} placeholder="Ingrese ${key}" />
				</div>
			`;
		}
	});

	return data.join('');
}

function createForm(fields: Record<string, unknown>) {
	const formFields = createFormFields(fields);

	return `
		<div class="py-2 w-[350px]">
			<span class="w-full text-xl font-semibold block">Editar característica</span>
			<span class="block h-px w-full bg-neutral-300 mt-2"></span>
			<form>
				<div class="grid grid-cols-2 py-4 gap-4 items-center place-content-center">
					${formFields}
				</div>
				<span class="block h-px w-full bg-neutral-300 mt-2 mb-4"></span>
				<button type="submit" class="flex h-9 w-full items-center justify-center gap-x-1 whitespace-nowrap rounded-lg bg-primary-700 px-4 py-2 font-medium text-white ring-offset-white transition-colors focus-within:bg-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:bg-primary-600 text-base">Guardar</button>
			</form>
		</div>
	`;
}

export function createPopup(feature: Feature) {
	const { id, properties } = feature;

	const content = createForm({ id, ...properties });
	const popup = window.L.popup({ content: content, interactive: true, maxWidth: 500 });

	return popup;
}
