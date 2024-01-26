<script lang="ts">
	import type { ToleranceStore } from '$lib/stores';
	import type { HTMLAttributes } from 'svelte/elements';

	import { capitalize } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { toleranceOptions } from '$lib/stores';
	import { SparkleIcon } from '$lib/components/icons';
	import { FormGroup, Label, Select } from '$lib/components/ui/forms';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		tolerance: ToleranceStore;
	}

	let { tolerance, class: className, ...props } = $props<Props>();

	let showOptions: boolean = $state(false);
	let enhanceForm: HTMLDivElement | undefined = $state();
	let enhanceButton: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (showOptions) window.addEventListener('click', handleClick);
		else window.removeEventListener('click', handleClick);
	});

	const toggleOptions = () => (showOptions = !showOptions);

	const handleClick = (event: MouseEvent) => {
		if (showOptions) {
			if (
				!enhanceForm?.contains(event.target as Node) &&
				!enhanceButton?.contains(event.target as Node)
			)
				showOptions = false;
		}
	};

	const enhancementOptions = Object.entries(toleranceOptions).map(([key, value]) => {
		if (value === $tolerance) return { label: capitalize(key), value, selected: true };
		return { label: capitalize(key), value };
	});
</script>

<div class="relative" bind:this={enhanceButton} {...props}>
	<button
		class="inline-flex size-[30px] items-center justify-center rounded-md bg-white p-1 shadow outline outline-1 outline-slate-300 transition-colors focus-within:bg-neutral-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:bg-neutral-100"
		onclick={toggleOptions}
		type="button"
		aria-label="Enhance uploaded data"
	>
		<SparkleIcon />
	</button>

	{#if showOptions}
		<div
			class="absolute right-6 top-0 rounded-md bg-white shadow outline outline-1 outline-slate-300"
			bind:this={enhanceForm}
			transition:fade={{ duration: 150 }}
		>
			<FormGroup class="w-60 py-6 focus-within:bg-white hover:bg-white">
				<Label for="tolerance">Nivel de ajuste</Label>
				<Select id="tolerance" bind:value={$tolerance} options={enhancementOptions} />
			</FormGroup>
		</div>
	{/if}
</div>
