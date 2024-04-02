<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { Tolerance } from '$lib/states.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	import { capitalize } from '$lib/utils';
	import { toleranceOptions } from '$lib';
	import { SparkleIcon } from '$lib/components/icons';
	import { FormGroup, Label, Select } from '$lib/components/ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		tolerance: Tolerance;
	}

	let { tolerance, ...props }: Props = $props();

	let showOptions: boolean = $state(false);

	const clickOutside: Action<HTMLDivElement> = (modalContainer: HTMLDivElement) => {
		function handleClick(event: MouseEvent) {
			const target = event.target as HTMLElement;

			if (modalContainer && !modalContainer.contains(target)) {
				showOptions = false;
			}
		}

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	};

	const enhancementOptions = Object.entries(toleranceOptions).map(([key, value]) => {
		if (value === tolerance.value!) {
			return { label: capitalize(key), value, selected: true };
		}

		return { label: capitalize(key), value };
	});
</script>

<div class="relative" use:clickOutside {...props}>
	<button
		class="inline-flex size-[30px] items-center justify-center rounded-md bg-white p-1 shadow outline outline-1 outline-slate-300 transition-colors focus-within:bg-neutral-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:bg-neutral-100"
		onclick={() => (showOptions = !showOptions)}
		type="button"
		aria-label="Enhance uploaded data"
	>
		<SparkleIcon />
	</button>

	{#if showOptions}
		<form
			class="absolute right-6 top-0 rounded-md bg-white shadow outline outline-1 outline-slate-300"
			transition:fade={{ duration: 300, easing: cubicOut }}
		>
			<FormGroup class="w-60 py-6 focus-within:bg-white hover:bg-white">
				<Label for="tolerance">Nivel de ajuste</Label>
				<Select id="tolerance" bind:value={tolerance.value!} options={enhancementOptions} />
			</FormGroup>
		</form>
	{/if}
</div>
