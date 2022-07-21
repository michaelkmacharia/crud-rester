#!/usr/bin/env node

`use strict` ;

const colors = require ( `colors` ) ;

const express = require ( `express` ) ;

const { JsonDB } = require ( `node-json-db` ) ;

const { Config } = require ( `node-json-db/dist/lib/JsonDBConfig` ) ;

const app = express () ;

const database = new JsonDB ( new Config ( `./backend/database` , true , false , `/` ) ) ;

app . get ( `/` , ( request , response ) =>
	{
		response . status ( 200 ) . json ( { response : `Welcome to crud-rester.` } ) ;
		return ;
	}
) ;

app . post ( `/api/create` , ( request , response ) =>
	{
		try
		{
			const { user_id , user_data } = request . body ;
			const user_path = `/user/${ user_id }` ;
			database . push ( user_path , { user_id : user_id , user_data : user_data } ) ;
			response . status ( 200 ) . json ( { response : `Successfully created your data` } ) ;
			return ;
		}
		catch ( error )
		{
			console . error ( error . message . brightRed ) ;
			response . status ( 500 ) . json ( { response : `Error creating your data.` } ) ;
			return ;
		}
	}
) ;

app . get ( `/api/read` , ( request , response ) =>
	{
		try
		{
			const { user_id } = request . body ;
			const user_path = `/user/${ user_id }` ;
			const data = database . getData ( user_path ) ;
			response . status ( 200 ) . json ( { response : `Successfully read your data` , data : data } ) ;
			return ;
		}
		catch ( error )
		{
			console . error ( error . message . brightRed ) ;
			response . status ( 500 ) . json ( { response : `Error reading your data.` } ) ;
			return ;
		}
	}
) ;

app . put ( `/api/update` , ( request , response ) =>
	{
		try
		{
			const { user_id , user_data } = request . body ;
			const user_path = `/user/${ user_id }` ;
			database . push ( user_path , { user_id : user_id , user_data : user_data } ) ;
			response . status ( 200 ) . json ( { response : `Successfully updated your data` } ) ;
			return ;
		}
		catch ( error )
		{
			console . error ( error . message . brightRed ) ;
			response . status ( 500 ) . json ( { response : `Error updating your data.` } ) ;
			return ;
		}
	}
) ;

app . delete ( `/api/delete` , ( request , response ) =>
	{
		try
		{
			const { user_id } = request . body ;
			const user_path = `/user/${ user_id }` ;
			database . delete ( user_path ) ;
			response . status ( 200 ) . json ( { response : `Successfully deleted your data` } ) ;
			return ;
		}
		catch ( error )
		{
			console . error ( error . message . brightRed ) ;
			response . status ( 500 ) . json ( { response : `Error deleting your data.` } ) ;
			return ;
		}
	}
) ;

const port = process . env . PORT || 5000 ;

app . listen ( port , () =>
	{
		console . log ( `crud-rester listening on port: ` . brightWhite , `${ port }` . brightGreen ) ;
		return ;
	}
) ;
