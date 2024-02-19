export const createPopup = (layer: L.Layer) => {
	return (
		`<h3 class="text-base font-semibold text-slate-500">Edit Feature</h3>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<form id="form-${layer.feature.id}" class="w-[302px] grid grid-cols-2 items-center place-content-center gap-4">` +
		`<div>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<label class="block p-1 font-semibold text-slate-500" for="id-${layer.feature.id}">ID</label>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<input class="bg-neutral-200 text-neutral-500 select-none cursor-not-allowed w-full px-3 py-1.5 rounded border border-slate-300 " type="text" id="id-${layer.feature.id}" name="id" value="${layer.feature.id}" placeholder="Feature ID" readonly>` +
		`</div>` +
		`<div>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<label class="block p-1 font-semibold text-slate-500" for="nameID-${layer.feature.id}">Name ID</label>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<input class="w-full px-3 py-1.5 rounded border border-slate-300" type="text" id="nameID-${layer.feature.id}" name="nameID" value="${layer.feature.properties.nameID || ''}" placeholder="Feature name ID">` +
		`</div>` +
		`<div>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<label class="block p-1 font-semibold text-slate-500" for="zoneType-${layer.feature.id}">Zone Type</label>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<input class="w-full px-3 py-1.5 rounded border border-slate-300" type="text" id="zoneType-${layer.feature.id}" name="zoneType" value="${layer.feature.properties.zoneType || ''}" placeholder="Feature zone type">` +
		`</div>` +
		`<div>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<label class="block p-1 font-semibold text-slate-500" for="stroke-${layer.feature.id}">Stroke</label>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<input class="w-full px-3 py-1.5 rounded border border-slate-300" type="color" id="stroke-${layer.feature.id}" name="stroke" value="${layer.feature.properties.stroke || '#3388ff'}">` +
		`</div>` +
		`<div>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<label class="block p-1 font-semibold text-slate-500" for="stroke-width-${layer.feature.id}">Stroke Width</label>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<input class="w-full px-3 py-1.5 rounded border border-slate-300" type="number" id="stroke-width-${layer.feature.id}" name="stroke-width" value="${layer.feature.properties['stroke-width'] || 3}" placeholder="Feature stroke width">` +
		`</div>` +
		`<div>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<label class="block p-1 font-semibold text-slate-500" for="stroke-opacity-${layer.feature.id}">Stroke Opacity</label>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<input class="w-full px-3 py-1.5 rounded border border-slate-300" type="number" id="stroke-opacity-${layer.feature.id}" name="stroke-opacity" value="${layer.feature.properties['stroke-opacity'] || 1}" min="0" max="1" step="0.1" placeholder="Feature stroke opacity">` +
		`</div>` +
		`<div>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<label class="block p-1 font-semibold text-slate-500" for="fill-${layer.feature.id}">Fill</label>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<input class="w-full px-3 py-1.5 rounded border border-slate-300" type="color" id="fill-${layer.feature.id}" name="fill" value="${layer.feature.properties.fill || '#3388ff'}">` +
		`</div>` +
		`<div>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<label class="block p-1 font-semibold text-slate-500" for="fill-opacity-${layer.feature.id}">Fill Opacity</label>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<input class="w-full px-3 py-1.5 rounded border border-slate-300" type="number" id="fill-opacity-${layer.feature.id}" name="fill-opacity" value="${layer.feature.properties['fill-opacity'] || 0.2}" min="0" max="1" step="0.1" placeholder="Feature fill opacity">` +
		`</div>` +
		`<hr class="col-span-2" />` +
		`<button class="w-full px-3 py-1.5 text-white bg-primary-600 rounded hover:bg-primary-700 col-span-2">Save</button>` +
		`</form>`
	);
};
