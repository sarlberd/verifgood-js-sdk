import { Composant } from '../src/apiRequests/Composant';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { ComposanCreateRequest, ComposanUpdateRequest, ComposantIcon, LibelProblem } from '../src/types/Composant';

describe('Composant API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const composant = new Composant(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(composant.endpoint).toBe('/api/composants');
      expect(composant.endpointSingleton).toBe('/api/composant');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(composant.auth).toBe(mockAuth);
      expect(composant.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('CRUD Operations', () => {
    describe('getAll (ComposantMixins_get equivalent)', () => {
      it('should get all composants with metadatas', async () => {
        const mockResponse = [
          { id: 1, name: 'Composant 1', description: 'Test composant' },
          { id: 2, name: 'Composant 2', description: 'Another composant' }
        ];
        const metadatas = new Metadatas();
        
        jest.spyOn(composant, 'get').mockResolvedValue(mockResponse);

        const result = await composant.getAll(metadatas);

        expect(composant.get).toHaveBeenCalledWith('/api/composants', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('create (ComposantMixins_create equivalent)', () => {
      it('should create composants', async () => {
        const mockResponse = { success: true, ids: [1, 2] };
        const composantsData = [
          { name: 'Composant 1', description: 'Test composant' },
          { name: 'Composant 2', description: 'Another composant' }
        ];
        
        jest.spyOn(composant, 'post').mockResolvedValue(mockResponse);

        const result = await composant.create(composantsData);

        expect(composant.post).toHaveBeenCalledWith('/api/composants', { datas: composantsData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('update (ComposantMixins_update equivalent)', () => {
      it('should update a composant', async () => {
        const mockResponse = { success: true };
        const composantData = { 
          id: 1, 
          name: 'Updated Composant', 
          description: 'Updated description' 
        };
        
        jest.spyOn(composant, 'put').mockResolvedValue(mockResponse);

        const result = await composant.update(1, composantData);

        expect(composant.put).toHaveBeenCalledWith('/api/composant/1', { datas: composantData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('remove (ComposantMixins_delete equivalent)', () => {
      it('should delete a composant', async () => {
        const mockResponse = { success: true };
        
        jest.spyOn(composant, 'delete').mockResolvedValue(mockResponse);

        const result = await composant.remove(1);

        expect(composant.delete).toHaveBeenCalledWith('/api/composant/1');
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Non-CRUD Methods', () => {
    describe('postComposants (duplicate of create)', () => {
      it('should post composants', async () => {
        const mockResponse = { success: true };
        const composantsData = [{ name: 'Test Composant' }];
        
        jest.spyOn(composant, 'post').mockResolvedValue(mockResponse);

        const result = await composant.postComposants(composantsData);

        expect(composant.post).toHaveBeenCalledWith('/api/composants', { datas: composantsData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('putComposant (enhanced update)', () => {
      it('should update a composant and clean unwanted properties', async () => {
        const mockResponse = { success: true };
        const composantData = { 
          id: 1, 
          name: 'Updated Composant',
          composants_categorie_id: 123, // should be removed
          categorie_id: 456 // should be removed
        };
        
        jest.spyOn(composant, 'put').mockResolvedValue(mockResponse);

        const result = await composant.putComposant(composantData);

        expect(composant.put).toHaveBeenCalledWith('/api/composant/1', { 
          datas: [{ id: 1, name: 'Updated Composant' }] 
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteComposant (legacy delete)', () => {
      it('should delete a composant using legacy endpoint', async () => {
        const mockResponse = { success: true };
        
        jest.spyOn(composant, 'apiRequest').mockResolvedValue(mockResponse);

        const result = await composant.deleteComposant(1);

        expect(composant.apiRequest).toHaveBeenCalledWith('/api/composant/1', 'DELETE', null);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('postLibelProblem', () => {
      it('should add a libel problem to a composant', async () => {
        const mockResponse = { success: true };
        const libelProblem: LibelProblem = { description: 'Test problem' };
        
        jest.spyOn(composant, 'post').mockResolvedValue(mockResponse);

        const result = await composant.postLibelProblem(1, libelProblem);

        expect(composant.post).toHaveBeenCalledWith('/api/libelProblem/composant/1', { datas: [libelProblem] });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteLibelProblem', () => {
      it('should delete a libel problem', async () => {
        const mockResponse = { success: true };
        
        jest.spyOn(composant, 'delete').mockResolvedValue(mockResponse);

        const result = await composant.deleteLibelProblem(1);

        expect(composant.delete).toHaveBeenCalledWith('/api/libelProblem/1');
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getIcons', () => {
      it('should get available icons for composants', async () => {
        // Mock XMLHttpRequest
        const mockXHR = {
          open: jest.fn(),
          send: jest.fn(),
          readyState: 4,
          responseText: 'icon1.png,icon2.svg,icon3.png',
          onreadystatechange: null as any
        };
        
        (global as any).XMLHttpRequest = jest.fn(() => mockXHR);

        const promise = composant.getIcons();
        
        // Simulate XMLHttpRequest completion
        if (mockXHR.onreadystatechange) {
          mockXHR.onreadystatechange();
        }

        const result = await promise;

        expect(mockXHR.open).toHaveBeenCalledWith('GET', '/static/assets/icone/composant/const.json', true);
        expect(result).toEqual([
          { label: 'icon1', src: '/static/assets/icone/composant/icon1.png' },
          { label: 'icon2', src: '/static/assets/icone/composant/icon2.svg' },
          { label: 'icon3', src: '/static/assets/icone/composant/icon3.png' }
        ]);
      });
    });

    describe('associateComposants (deprecated)', () => {
      it('should associate composants with equipment', async () => {
        const mockResponse = { success: true };
        const composantsList = [{ id: 1, equipmentId: 2 }];
        
        jest.spyOn(composant, 'post').mockResolvedValue(mockResponse);

        const result = await composant.associateComposants(composantsList);

        expect(composant.post).toHaveBeenCalledWith('/api/assigncomposants', composantsList);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('associateLibelleProblemes (deprecated)', () => {
      it('should associate libelle problemes with a composant', async () => {
        const mockResponse = { success: true };
        const lpsList = ['problem1', 'problem2'];
        
        jest.spyOn(composant, 'post').mockResolvedValue(mockResponse);

        const result = await composant.associateLibelleProblemes(1, lpsList);

        expect(composant.post).toHaveBeenCalledWith('/api/assignlibellesproblemes', [
          { composant: 1, libelle: 'problem1' },
          { composant: 1, libelle: 'problem2' }
        ]);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getLibelleProblemOf (utility)', () => {
      it('should filter libelle problems by composant name', () => {
        const libelleProblemCollection: LibelProblem[] = [
          { id: 1, libel_composant: 'Composant A - Problem 1' },
          { id: 2, libel_composant: 'Composant B - Problem 2' },
          { id: 3, libel_composant: 'Composant A - Problem 3' }
        ];

        const result = composant.getLibelleProblemOf('Composant A', libelleProblemCollection);

        expect(result).toEqual([
          { id: 1, libel_composant: 'Composant A - Problem 1' },
          { id: 3, libel_composant: 'Composant A - Problem 3' }
        ]);
      });

      it('should return empty array when no matches found', () => {
        const libelleProblemCollection: LibelProblem[] = [
          { id: 1, libel_composant: 'Composant B - Problem 1' }
        ];

        const result = composant.getLibelleProblemOf('Composant A', libelleProblemCollection);

        expect(result).toEqual([]);
      });
    });

    describe('getComposants (alternative getAll)', () => {
      it('should get composants with provided metadatas', async () => {
        const mockResponse = [{ id: 1, name: 'Test Composant' }];
        const metadatas = { directives: [], filters: [{ attr: 'name', value: 'test' }] };
        
        jest.spyOn(composant, 'get').mockResolvedValue(mockResponse);

        const result = await composant.getComposants(metadatas);

        expect(composant.get).toHaveBeenCalledWith('/api/composants', metadatas, {});
        expect(result).toEqual(mockResponse);
      });

      it('should get composants with default metadatas when none provided', async () => {
        const mockResponse = [{ id: 1, name: 'Test Composant' }];
        
        jest.spyOn(composant, 'get').mockResolvedValue(mockResponse);

        const result = await composant.getComposants();

        expect(composant.get).toHaveBeenCalledWith('/api/composants', { directives: [], filters: [] }, {});
        expect(result).toEqual(mockResponse);
      });
    });
  });
});
