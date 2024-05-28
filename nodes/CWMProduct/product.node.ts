import { INodeType, INodeTypeDescription } from 'n8n-workflow';


export class ProductCWM implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CWM Products',
        name: 'ProductCWM',
        icon: 'file:swm.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Get data from CWMs API',
        defaults: {
            name: 'CWM Products',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'CWMApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.nasa.gov',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
},
		properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Astronomy Picture of the Day',
                            value: 'astronomyPictureOfTheDay',
                        },
                        {
                            name: 'Mars Rover Photos',
                            value: 'marsRoverPhotos',
                        },
                    ],
                    default: 'astronomyPictureOfTheDay',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: [
                                'astronomyPictureOfTheDay',
                            ],
                        },
                    },
                    options: [
                        {
                            name: 'Get',
                            value: 'get',
                            action: 'Get the APOD',
                            description: 'Get the Astronomy Picture of the day',
                            routing: {
                                request: {
                                    method: 'GET',
                                    url: '/planetary/apod',
                                },
                            },
                        },
                    ],
                    default: 'get',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: [
                                'marsRoverPhotos',
                            ],
                        },
                    },
                    options: [
                        {
                            name: 'Get',
                            value: 'get',
                            action: 'Get Mars Rover photos',
                            description: 'Get photos from the Mars Rover',
                            routing: {
                                request: {
                                    method: 'GET',
                                },
                            },
                        },
                    ],
                    default: 'get',
                },
                {
                    displayName: 'Rover name',
                    description: 'Choose which Mars Rover to get a photo from',
                    required: true,
                    name: 'roverName',
                    type: 'options',
                    options: [
                        {name: 'Curiosity', value: 'curiosity'},
                        {name: 'Opportunity', value: 'opportunity'},
                        {name: 'Perseverance', value: 'perseverance'},
                        {name: 'Spirit', value: 'spirit'},
                    ],
                    routing: {
                        request: {
                            url: '=/mars-photos/api/v1/rovers/{{$value}}/photos',
                        },
                    },
                    default: 'curiosity',
                    displayOptions: {
                        show: {
                            resource: [
                                'marsRoverPhotos',
                            ],
                        },
                    },
                },
                {
                    displayName: 'Date',
                    description: 'Earth date',
                    required: true,
                    name: 'marsRoverDate',
                    type: 'dateTime',
                    default:'',
                    displayOptions: {
                        show: {
                            resource: [
                                'marsRoverPhotos',
                            ],
                        },
                    },
                    routing: {
                        request: {
                            // You've already set up the URL. qs appends the value of the field as a query string
                            qs: {
                                earth_date: '={{ new Date($value).toISOString().substr(0,10) }}',
                            },
                        },
                    },
                },
                {
                    displayName: 'Additional Fields',
                    name: 'additionalFields',
                    type: 'collection',
                    default: {},
                    placeholder: 'Add Field',
                    displayOptions: {
                        show: {
                            resource: [
                                'astronomyPictureOfTheDay',
                            ],
                            operation: [
                                'get',
                            ],
                        },
                    },
                    options: [
                        {
                            displayName: 'Date',
                            name: 'apodDate',
                            type: 'dateTime',
                            default: '',
                            routing: {
                                request: {
                                    // You've already set up the URL. qs appends the value of the field as a query string
                                    qs: {
                                        date: '={{ new Date($value).toISOString().substr(0,10) }}',
                                    },
                                },
                            },
                        },
                    ],									
                }
            
            ]
	};
}