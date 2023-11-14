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
	],
	input: [
		{
			name: 'Directory',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio'
			},
			hint: 'Directorio'
		},
		{
			name: 'Map',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el mapa'
			},
			hint: 'Mapa'
		},
		{
			name: 'Zones',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese las zonas'
			},
			hint: 'Zonas'
		}
	],
	output: [
		{
			name: 'ProgressBar',
			element: 'select',
			attributes: {
				placeholder: 'Seleccione la barra de progreso',
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
			hint: 'Barra de progreso'
		},
		{
			name: 'Interval',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el intervalo'
			},
			hint: 'Intervalo'
		},
		{
			name: 'Directory',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio'
			},
			hint: 'Directorio'
		},
		{
			name: 'AgentsOut',
			element: 'select',
			attributes: {
				placeholder: 'Seleccione la salida de agentes',
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
			hint: 'Salida de agentes'
		},
		{
			name: 'AgentsPath',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio de agentes'
			},
			hint: 'Directorio de agentes'
		},
		{
			name: 'AgentsPrecision',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la precisión de agentes'
			},
			hint: 'Precisión de agentes'
		},
		{
			name: 'AgentsSufix',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el sufijo de agentes'
			},
			hint: 'Sufijo de agentes'
		},
		{
			name: 'StatsOut',
			element: 'select',
			attributes: {
				placeholder: 'Seleccione la salida de estadísticas',
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
			hint: 'Salida de estadísticas'
		},
		{
			name: 'StatsInterval',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el intervalo de estadísticas'
			},
			hint: 'Intervalo de estadísticas'
		},
		{
			name: 'StatsPath',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio de estadísticas'
			},
			hint: 'Directorio de estadísticas'
		},
		{
			name: 'Anim Config',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese nombre de archivo de configuración de animación'
			},
			hint: 'Nombre de archivo de configuración de animación'
		},
		{
			name: 'HeatMapOut',
			element: 'select',
			attributes: {
				placeholder: 'Seleccione la salida de mapa de calor',
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
			hint: 'Salida de mapa de calor'
		},
		{
			name: 'HeatMapSize',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el tamaño del mapa de calor'
			},
			hint: 'Tamaño del mapa de calor'
		},
		{
			name: 'HeatMapInterval',
			element: 'input',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el intervalo del mapa de calor'
			},
			hint: 'Intervalo del mapa de calor'
		},
		{
			name: 'HeatMapPath',
			element: 'input',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio del mapa de calor'
			},
			hint: 'Directorio del mapa de calor'
		}
	]
};
