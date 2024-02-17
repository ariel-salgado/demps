export type SelectOptions = {
	label: string | null;
	value: string | number | boolean;
	selected?: boolean | undefined;
}[];

export type ConfigurationSchema = {
	duration: number;
	calibration: number;
	quadSize: number;
	closeEnough: number; //float
	randomWalkwayRadius: number; //float
	attractionRadius: number; //float
	deltaT: number; //float
	threads: number;
	floodModelEnable: boolean;
	densityModelEnable: boolean;
	panicModelEnable: boolean;
	elevationModelEnable: boolean;
	debrisModelEnable: boolean;
	city: string;
	description: string;
	samplingInterval: number;
	baseDirSim: string;
	input: {
		directory: string;
		map: string;
		zones: string;
	};
	output: {
		progressBar: boolean;
		interval: number;
		directory: string;
		'agents-out': boolean;
		'agents-path': string;
		'agents-precision': number;
		'agents-sufix': string;
		'stats-out': boolean;
		'stats-interval': number;
		'stats-path': string;
		'anim-config': string;
		'heatMap-out': boolean;
		'heatMap-size': number;
		'heatMap-interval': number;
		'heatMap-path': string;
	};
	floodParams: {
		direction: string; //N->S;W->E
		sampleStateInterval: number;
		arrivalTime: number; //negative
		speedWaterProp: number; //float
		speedWaterLevel: number; //float
		criticalLevel: number; //float
		minSpeedFactor: number; //float
		imagesEnable: boolean;
		imagesDir: string;
		stateEnable: boolean;
		stateDir: string;
	};
	densityParams: {
		minDensity: number; //float
		maxDensity: number; //float
		minVelocity: number; //float
	};
	agents: Agent[];
};

type Agent = {
	model: 'Residents' | 'Visitors';
	number: number;
	responseTime: {
		tau: number;
		sigma: number;
	};
	phoneUse: {
		meanTimeTakePhone: number; //float
		probPhoneUseConst: number;
	};
	ageRange: {
		G0: {
			prob: number; //float
			minSpeed: number; //float
			maxSpeed: number; //float
		};
		G1: {
			prob: number; //float
			minSpeed: number; //float
			maxSpeed: number; //float
		};
		G2: {
			prob: number; //float
			minSpeed: number; //float
			maxSpeed: number; //float
		};
		G3: {
			prob: number; //float
			minSpeed: number; //float
			maxSpeed: number; //float
		};
	};
	SFM: {
		timeRelax: number; //float
		sigma: number; //float
		repulsiveForceAgents: number; //float
		cosphi: number; //negative float
	};
	panicModel: {
		emotionThreshold: number; //float
		probInfectedToRecovered: number; //float
		probRecoveredToSusceptible: number; //float
		meanTimeInInfected: number;
		sdTimeInInfected: number; //float
		meanTimeInRecovered: number;
		sdTimeInRecovered: number; //float
	};
};
