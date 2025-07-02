GOAL = convert VUE2JS mixins methods to apiRequest in the current sdk
model temperature = 0
___

Context = we are migrating Vue2 to Vue3. Mixins contains the API calls. we are making the api call agnostic of framework. Mixins contains others methods not calling the API, we must keep them too.
___

RULES :
- be simple 
- Mixins are highly sensible do not modify properties in methods definitions. 
- use the method name if not a CRUD operation. 
- do not take intoAccount the <entity>Mixins_ in the method naming inside the sdk. 
- do not override methods to add semantic typing in the apiRequest if same behavior and 
- No linting permitted
CRITICAL: HttpClient method signatures must be respected:
- get(endpoint, metadatas, query) - requires 3 parameters (metadatas as 2nd param, query as 3rd param)
- post(endpoint, data) - takes 2 parameters
- put(endpoint, data) - takes 2 parameters
- delete(endpoint) - takes 1 parameter
The HttpClient automatically parses metadatas into query string. Cannot pass raw query objects directly to GET methods.

___

execution plan = 
- run command "npm run test" if unit tests passed go on, otherwise akcnowledge the user and stop
- the mixins are provided in the mixins_to_migrate folder
- use the first mixins file
- analyse the mixins and ask for clarifications ( only if needed )
- call the script extract_methods_name_from_mixin(mixinName) with the selected mixin name ( eg: python extract_methods_name_from_mixins.py AffectationsMixins ) and memorize it as mixins_methods
- generate the template with hygen, the avalaible commands are provided below.use the cli args and options to create the templates automatically exemple : "--name=Account --endpoint=/api/account --endpointSingleton=/api/account --description="Service for managing user accounts" --properties="address:string:optional,immatriculation:string:optional,id:string:optional" --addToVGSDK=true"
- Add into tests : from your analyse add the tests corresponding to the mixins consider non CRUD methods only. 
- Add into the created apiRequests other methods than CRUD from the mixins because the CRUD methods are already defined in the parent class. if a method contains custom logic add a flag //@TODO : message. this will be handled manually by devs
- Add into types only if you have a reference in the mixins we can't invent or imagine
- if the types are not provided we will handle it later do not try to implement or imagine and add flag //@TODO : need review 
- Add the new entity in the VGSDK
- run command "npm run test" : while it fails -> fix
- compare  the mixins_methods and the generated apiRequest and check if all mixins_methods are implemented into the generated apiRequest, if not ouput a missing methods list in a markdown <mixinsName>_missing_methods.md
- once terminated move the mixins in the subfolder mixins_to_migrate/done
- ask the user if he wants to continue on the next one
- if (y) then loop on step 1 else stop 


___

# Avalaible hygen commands

# Generate complete service (recommended)
hygen service-with-type new

# Generate individual components
hygen api-service new    # API service only
hygen type new          # Type definitions only
hygen test new          # Test files only