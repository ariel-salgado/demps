<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { SparkleIcon } from '$lib/components/icons';
	import { Label, Select } from '$lib/components/ui/forms';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		tolerance: number;
	}

	let { tolerance, class: className, ...props } = $props<Props>();

	let showOptions: boolean = $state(false);
	let enhancementButton: HTMLDivElement | undefined = $state();
	let enhancementPanel: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (showOptions) {
			window.addEventListener('click', handleClick);
		} else {
			window.removeEventListener('click', handleClick);
		}
	});

	const toggleOptions = () => {
		showOptions = !showOptions;
	};

	const handleClick = (event: MouseEvent) => {
		if (showOptions) {
			if (
				!enhancementPanel?.contains(event.target as Node) &&
				!enhancementButton?.contains(event.target as Node)
			) {
				showOptions = false;
			}
		}
	};

	const enhancementOptions = [
		{ value: 0, text: 'Deshabilitado' },
		{ value: 0.0001, text: 'Bajo' },
		{ value: 0.00015, text: 'Medio' },
		{ value: 0.0002, text: 'Alto' }
	];
</script>

<div
	class={cn(
		'h-min w-min rounded-md bg-white shadow outline outline-1 outline-slate-300',
		className
	)}
	{...props}
	bind:this={enhancementButton}
>
	<button class="p-1" type="button" on:click={toggleOptions}>
		<SparkleIcon />
	</button>

	{#if showOptions}
		<div
			class="absolute left-0 top-0"
			bind:this={enhancementPanel}
			transition:fade={{ duration: 150 }}
		>
			<div class="relative">
				<div
					class="absolute right-6 rounded-md bg-white shadow outline outline-1 outline-slate-300"
				>
					<div class="p-6">
						<div class="grid items-center gap-x-2 gap-y-1">
							<Label class="text-base" for="smoothing">Nivel de ajuste</Label>
							<Select id="smoothing" bind:value={tolerance} options={enhancementOptions} />
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
