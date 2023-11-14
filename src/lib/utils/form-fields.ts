type TElement =
	| {
			name: string;
			element: 'input';
			attributes: {
				type: 'text' | 'number';
				placeholder?: string;
				value?: string;
			};
			hint?: string;
	  }
	| {
			name: string;
			element: 'select';
			attributes: {
				placeholder?: string;
				value?: string;
				options: Array<{
					value: string | number | boolean;
					text: string;
				}>;
			};
			hint?: string;
	  };

type TConfigurationFormFields = {
	[key: string]: Array<TElement>;
};

export const configurationFormFields: TConfigurationFormFields = {
	general: [
		{
			name: 'Duration',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la duración de la simulación'
			},
			hint: 'Duración de la simulación'
		},
		{
			name: 'Calibration',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la calibración de la simulación'
			},
			hint: 'Calibración de la simulación'
		},
		{
			name: 'QuadSize',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el tamaño de los cuadrantes'
			},
			hint: 'Tamaño de los cuadrantes'
		},
		{
			name: 'CloseEnough',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la distancia de cercanía'
			},
			hint: 'Distancia de cercanía'
		},
		{
			name: 'RandomWalkwayRadius',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el radio de la caminata aleatoria'
			},
			hint: 'Radio de la caminata aleatoria'
		},
		{
			name: 'AttractionRadius',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el radio de atracción'
			},
			hint: 'Radio de atracción'
		},
		{
			name: 'DeltaT',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el delta T'
			},
			hint: 'Delta T'
		},
		{
			name: 'Threads',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la cantidad de hilos'
			},
			hint: 'Cantidad de hilos'
		},
		{
			name: 'FloodModelEnable',
			element: 'select',
			attributes: {
				placeholder: 'Seleccione el modelo de inundación',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de inundación'
		},
		{
			name: 'DensityModelEnable',
			element: 'select',
			attributes: {
				placeholder: 'Seleccione el modelo de densidad',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de densidad'
		},
		{
			name: 'PanicModelEnable',
			element: 'select',
			attributes: {
				placeholder: 'Ingrese el modelo de pánico',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de pánico'
		},
		{
			name: 'ElevationModelEnable',
			element: 'select',
			attributes: {
				placeholder: 'Ingrese el modelo de elevación',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de elevación'
		},
		{
			name: 'DebrisModelEnable',
			element: 'select',
			attributes: {
				placeholder: 'Ingrese el modelo de escombros',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de escombros'
		},
		{
			name: 'City',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese la ciudad'
			},
			hint: 'Ciudad'
		},
		{
			name: 'Description',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese la descripción'
			},
			hint: 'Descripción'
		},
		{
			name: 'SamplingInterval',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el intervalo de muestreo'
			},
			hint: 'Intervalo de muestreo'
		},
		{
			name: 'BaseDirSim',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio base de la simulación'
			},
			hint: 'Directorio base de la simulación'
		}
	]
};
