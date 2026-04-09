# TODO - All apiRequests (53 files)

## Account
- [ ] updateAccount(data: AccounUpdateRequest)
- [ ] fetchAccount()
- [ ] createAccount(account: AccounCreateRequest)
- [ ] getAll(metadatas: Metadatas)
- [ ] getById(id: number)
- [ ] create(data: any)
- [ ] update(id: number, data: any)
- [ ] remove(id: number)

## Affectations
- [ ] copieAffectationTache(affectation, start, end, affectes)
- [ ] createAffectationsUsersTaches(affectes)
- [ ] deleteAffectationsUsersTaches(affecte)
- [ ] deleteAffectation(idAffectation)
- [ ] saveSchedule(schedule, maintenance, emailDatas?)
- [ ] saveSchedules(schedule, maintenances)
- [ ] updateSchedule(schedule)
- [ ] fetchProgrammationContratIntervention(contratId)
- [ ] createProgrammationContratIntervention(programmation, contratId)
- [ ] updateProgrammationContratIntervention(programmation, contratId)
- [ ] toCalendar(item, type, color)
- [ ] formatCalendars(affectables)

## BonDeCommandeItems
- [ ] getAll(metadatas: Metadatas)
- [ ] create(bonDeCommandeItems)
- [ ] update(bonDeCommandeItem)
- [ ] remove(bonDeCommandeItem)
- [ ] getClones(metadatas: Metadatas)

## BonsDeCommande
- [ ] cancel(bonDeCommande)
- [ ] skipSending(bonDeCommande)
- [ ] demandeValidation(bonDeCommande)
- [ ] envoiCommande(bonDeCommande, destinataire, destinataireCC, pdfBlob)
- [ ] livraison(bonDeCommande, itemsLivraison, depot?)
- [ ] livraisonTotale(bonDeCommande, depot?)
- [ ] nonLivre(bonDeCommande)
- [ ] clone(bonDeCommande)
- [ ] getHistorique(bonDeCommande_id, metadatas)
- [ ] getPDF(idBonDeCommande, options?)
- [ ] getRepartitionMontantHt(metadatas, options?)
- [ ] export(metadatas, filename?, fileExtension?)
- [ ] getCreateurs(metadatas)
- [ ] getValidateurs(metadatas)

## BonsDeCommandeEntites
- [ ] getEntites(metadatas: Metadatas)
- [ ] getAll(metadatas: Metadatas)
- [ ] create(bonsDeCommandeEntites)
- [ ] update(bonsDeCommandeEntite)
- [ ] remove(bonsDeCommandeEntite)

## BonsDeSortie
- [ ] getBonsDeSortie(metadatas)
- [ ] getAll(metadatas)
- [ ] getBonDeSortie(idBonDeSortie)
- [ ] getById(id: number)
- [ ] create(bonsDeSortie, ficheDemandeConsommable?)
- [ ] update(bonDeSortie)
- [ ] remove(bonDeSortie)
- [ ] getSignataires(metadatas, type?)

## BonsDentree
- [ ] getBonsDentree(metadatas)
- [ ] getAll(metadatas)
- [ ] getBonDentree(idBonDentree)
- [ ] getById(id: number)
- [ ] create(bonsDentree)
- [ ] update(bonDentree)
- [ ] remove(bonDentree)

## Calendar
- [ ] getEvents(start?, end?, sites?, idTiers?, affectes?, metadatas?)
- [ ] formatEvents(events)

## Categories
- [ ] associateComposant(categorie_id, composant)
- [ ] desassociateComposant(composant_categorie_id)
- [ ] updateCollection(categories)
- [ ] associate(idCategorie, composants)
- [ ] postAssociatedComposants(idCategorie, composantsToAssociate)
- [ ] exportFile(metadatas, typeCategorie?, filename?, fileExtension?)
- [ ] deleteAssociatedComposants(idCategorie, composantsToDesassociate)
- [ ] fetchCategoriesLieux()
- [ ] getCategoriesWithDetails(metadatas?)
- [ ] addCorpsDetat(categorieId, corpsDetatId)

## Checkpoints
_(no public methods beyond inherited CRUD)_

## Composant
- [ ] postComposants(composants)
- [ ] putComposant(composant)
- [ ] deleteComposant(idComposant)
- [ ] postLibelProblem(idComposant, libelProblem)
- [ ] deleteLibelProblem(idLibelProblem)
- [ ] getIcons()
- [ ] associateComposants(composantsList)
- [ ] associateLibelleProblemes(idComposant, lpsList)
- [ ] getLibelleProblemOf(composantName, libelleProblemCollection)
- [ ] getComposants(metadatas?)

## Consommable
- [ ] getConsommables(metadatas, options?)
- [ ] getConsommablesEtiquettes(metadatas)
- [ ] getConsommablesConditionnementsColisage(metadatas)
- [ ] getConsommablesEnStock(metadatas)
- [ ] getConsommablesNonDisponibles(metadatas)
- [ ] getConsommablesEnDemande(metadatas)
- [ ] getConsommablesACommander(metadatas)
- [ ] getEquipements(consommable, metadatas)
- [ ] updateConsommables(consommables)
- [ ] deleteMultiple(consommables)
- [ ] updateStock(consommable, stock)
- [ ] getFile(metadatas, filename?, fileExtension?)
- [ ] getConsommablesForEquipement(idEquipement)
- [ ] getConsommablesForTiers(idTiers)
- [ ] createConsommableFournisseurs(consommableId, fournisseurs)
- [ ] removeConsommableFournisseurs(consommableId, fournisseur)
- [ ] createConsommations(consommations, idMaintenance?)
- [ ] createConsommablesEquipements(consommablesEquipements)
- [ ] removeConsommablesEquipements(consommableId, equipementId)
- [ ] getConsommations(metadatas)
- [ ] getRepartitionQuantites(metadatas)
- [ ] createConsommableMouvement(mouvement, idConsommable)
- [ ] deleteConsommableMouvement(idConsommableMouvement)
- [ ] getConsommableMouvementsDemandeurs(metadatas)
- [ ] getEquipementConsommables(equipement, metadatas)
- [ ] removeConsommable(consommable)
- [ ] createOperationsConsommations(consommations, idMaintenance)
- [ ] getExcelFileModeleIntegration(filename?)
- [ ] importModelConsommablesExcel(consommables)
- [ ] exportConsommables(metadatas, filename?, fileExtension?)

## Contact
_(no public methods beyond inherited CRUD)_

## Contrat
- [ ] getContrats(metadatas)
- [ ] fetchContrats(metadatas?)
- [ ] fetchContrat(idContrat, options?)
- [ ] create(data: ContraCreateRequest)
- [ ] updateContrat(contrat, options?)
- [ ] archive(contrat, options?)
- [ ] deleteContrat(contrat)
- [ ] attachCategoriesToContrat(categoriesContrat)
- [ ] formatStatus(contrat)

## ContratEcheancier
- [ ] getContratEcheances(contratId)
- [ ] create(data: ContratEcheancieCreateRequest)
- [ ] updateContratEcheance(id, data)
- [ ] deleteContratEcheance(id)

## CorpsDetat
- [ ] getCorpsDetats(metadatas)
- [ ] create(data: CorpsDetatType[])
- [ ] updateCorpsDetat(corpsdetat)
- [ ] deleteCorpsDetat(corpsdetat)

## Dashboard
- [ ] getCuratifTotaux(metadatas)
- [ ] getCuratifUrgentes(metadatas)
- [ ] getCuratifRepartitionAge(metadatas)
- [ ] getCuratifRepartitionComposants(metadatas)
- [ ] getCuratifRepartitionDemandeur(metadatas)
- [ ] getCuratifRepartitionUserAffecte(metadatas)
- [ ] getCuratifRepartitionTiersAffecte(metadatas)
- [ ] getCuratifRepartitionCategoriesEquipements(metadatas)
- [ ] getCuratifRepartitionCorpsDetat(metadatas)
- [ ] getCuratifRepartitionEquipements(metadatas)
- [ ] getCuratifRepartitionEquipementsCouts(metadatas)
- [ ] getCuratifRepartitionPieces(metadatas)
- [ ] getCuratifRepartitionDureeTraitement(metadatas)
- [ ] getPreventifRepartitionNonConformites(metadatas)
- [ ] getPreventifReleverCompteur(metadatas)
- [ ] getPreventifProchainesInterventionsExternes(metadatas)
- [ ] getPreventifProgressionInterne(metadatas)
- [ ] getConsommablesRepartitionConsommationsMaintenances(metadatas)
- [ ] getConsommablesRepartitionConsommationsBonsDeSortie(metadatas)
- [ ] getConsommablesRepartitionEnStock(metadatas)

## DeplacementsEquipements
- [ ] createDeplacementsEquipements(deplacements)

## Documents
- [ ] getAll(metadatas)
- [ ] getPlans(metadatas, sites?)
- [ ] create(documents)
- [ ] update(document)
- [ ] remove(document)

## Equipements
- [ ] getEquipementTimeline(equipement_id)
- [ ] getEquipementVerifications(equipement_id, metadatas?)
- [ ] getById(idEquipement)
- [ ] getByCode(code)
- [ ] getRapportAssets(metadatas)
- [ ] getRapportAssetsExcelFile(metadatas, fileExtension?)
- [ ] getAll(metadatas)
- [ ] getEquipementsTachesActivesSites(site, metadatas)
- [ ] getExcelFileModeleIntegration(filename?)
- [ ] getExcelFile(metadatas, filename?, fileExtension?)
- [ ] create(equipements)
- [ ] importModelEquipementsExcel(equipements)
- [ ] sortirEquipement(equipement, callback)
- [ ] remplacerEquipement(sortie, maintenance)
- [ ] update(equipement, options?)
- [ ] updateEquipements(equipements)
- [ ] remove(equipementId)
- [ ] createEquipementsGlobauxFamilleSite(famille, equipements)
- [ ] calculDepreciation(equipement)

## FicheDemandeConsommables
- [ ] getFiches(metadatas)
- [ ] getFiche(idFiche)
- [ ] create(ficheDemandeConsommables)
- [ ] update(fiche)
- [ ] close(fiche)
- [ ] priseEnCompte(fiche)
- [ ] enAttente(fiche)
- [ ] remove(fiche)
- [ ] getSignataires(metadatas)
- [ ] export(metadatas, filename?, fileExtension?)

## GroupeValidateurs
- [ ] getGroupeValidateurs(metadatas)

## GroupeValidateursUsers
- [ ] createAssociations(groupeValidateurs, validateurs)
- [ ] deleteAssociation(groupeValidateurUser)

## IntegrationsDonnees
- [ ] categoriesLieux(composants)

## Interventions
- [ ] getAll(metadatas, idEquipement?, siteEquipement?)
- [ ] getById(id, options?)
- [ ] update(id, intervention, options?)
- [ ] create(interventions)
- [ ] remove(id)
- [ ] getPdfFile(idIntervention, filename?, fileExtension?)
- [ ] formatToCalendarEvents(interventions)
- [ ] getCalendarEvents(metadatas)
- [ ] createInterventionsEquipements(idIntervention, equipements)
- [ ] deleteInterventionEquipement(interventionEquipement)
- [ ] deleteInterventionsEquipements(interventionsEquipements)

## Inventaire
- [ ] getAll(metadatas?)
- [ ] getById(id)
- [ ] create(inventaires)
- [ ] remove(id)
- [ ] fetch(metadatas)
- [ ] fetchEnCoursInventory()
- [ ] fetchOperationsByInventaireId(id)
- [ ] fetchOperationsByInventaireIdOnLieu(inventaire_id, lieu_id)
- [ ] finalizeInventaireOnLieu(inventaire_id, lieu_id)
- [ ] createOperation(operation, inventaire_id, lieu_id)
- [ ] removeOperationInventaire(operation)

## Invitations
- [ ] generateInvitationLink(invitationRequest)
- [ ] checkInvitation(invitationCard)
- [ ] regenerateInvitationLink(id)
- [ ] completeRegistration(registration)

## LibelProblem
- [ ] getAll(metadatas)
- [ ] create(libellesProblem)
- [ ] remove(id)
- [ ] createComposantProblems(idComposant, problems)
- [ ] deleteComposantProblem(problem)
- [ ] getComposantProblems(composantId)
- [ ] getLibellesProblemByCategorie(metadatas, idCategorie)
- [ ] getLibelsEquipement()

## LibelServices
- [ ] getAll(metadatas, options?)
- [ ] create(libelServices)
- [ ] deleteLibelService(libelService)

## LibellesCategorie
- [ ] getAll(metadatas)
- [ ] create(libellesCategories, options?)
- [ ] remove(id)

## Lieux
- [ ] getInitiales(lieu, level?)
- [ ] getOrganisations(metadatas?)
- [ ] getSites(metadatas)
- [ ] getLieux(metadatas, options?)
- [ ] getLieu(idLieu, options?)
- [ ] create(lieux, options?)
- [ ] importPieces(lieux)
- [ ] createPiecesGeneriques(siteId, lieux)
- [ ] createPiecesGeneriquesFamilleSite(famille, lieux)
- [ ] createPieceGenerique(siteId)
- [ ] updateLieu(lieu)
- [ ] updateLieux(lieux)
- [ ] deleteLieu(lieu)
- [ ] getExcelFile(metadatas, filename?, fileExtension?)
- [ ] saveRestrictionSiteForUser(collection)
- [ ] getFamilleBackgroundColor(familles)
- [ ] getFamilles(sites)

## Maintenance
- [ ] getMaintenances(metadatas, options?)
- [ ] getMesMaintenancesPlanifiees(metadatas)
- [ ] getDemandeurs(metadatas, options?)
- [ ] createMaintenances(maintenances, options?)
- [ ] demandeDevis(maintenanceId, payload)
- [ ] deleteMultiple(maintenances)
- [ ] relancer(maintenance, commentaire?)
- [ ] postMaintenanceOperations(idMaintenance, operations)
- [ ] postOperations(operations)
- [ ] putOperation(operation)
- [ ] deleteOperation(idOperation, operation)
- [ ] getCalendarEvents(metadatas)
- [ ] formatToCalendarEvents(maintenances)
- [ ] prendreEnCompteMaintenances(maintenances)
- [ ] prendreEnCompteMaintenance(maintenance)
- [ ] mettreEnAttenteMaintenances(maintenances)
- [ ] mettreEnAttenteMaintenance(maintenance)
- [ ] resolveMaintenances(maintenances, rapportCloture?)
- [ ] resolveMaintenance(maintenance, files?)
- [ ] reopenMaintenances(maintenanceId)
- [ ] setStatusMaintenances(maintenances, status)
- [ ] getFile(metadatas, filename?, fileExtension?)
- [ ] getPdfFile(idMaintenance, filename?, fileExtension?)
- [ ] coutInterne(workingTime)
- [ ] dureeMiseEnAttente(maintenance)
- [ ] dureeFermetureTemporaireHorsWeekend(maintenance)
- [ ] dureeNetteTraitement(maintenance)
- [ ] updateMultipleTypologies(maintenanceIds, typologyName)

## Messaging
- [ ] subscribeToTopic(topic, deviceToken, options?)
- [ ] unsubscribeFromTopic(topic, deviceToken, options?)
- [ ] unsubscribeFromAllTopics(deviceToken)
- [ ] sendMessageToTopic(topic, payload)
- [ ] sendMessageToDevice(deviceToken, payload)
- [ ] getSubscribedTopics(deviceToken)
- [ ] getAvailableTopics()

## MouvementsEquipements
- [ ] getMovements(metadatas)
- [ ] getMovementById(id)
- [ ] updateMovement(mouvementEquipement)
- [ ] createMovement(mouvementEquipement, type)
- [ ] deleteMovement(mouvementEquipement)
- [ ] getMouvementsSignataires(metadatas, type?)
- [ ] exportMovements(metadatas, filename?, fileExtension?)

## Operation
- [ ] createNew(idUser?, userId?)
- [ ] createBIOperation(data, idUser?, userId?)
- [ ] createPhotoOperation(idFM, file, idUser?, userId?)
- [ ] updateOperation(data)
- [ ] getFile(metadatas, fileExtension?, userId?, sites?)

## Parametres
- [ ] getParameters()
- [ ] updateParameter(datas)
- [ ] deleteDemoAccount(entitiesToRemove?)

## PersonalParameters
- [ ] localStorageWorksHere()
- [ ] getAllDisplayable()
- [ ] getLandingPage()
- [ ] getDefaultLandingPage(role?)
- [ ] setLandingPage(endpoint)
- [ ] isDisplayable(key)
- [ ] addDisplayable(element, isDisplayable)
- [ ] setUseIntegratedScannerInKeyboard(bool)
- [ ] getUseIntegratedScannerInKeyboard()
- [ ] initializeDefaults()

## PlanInteractif
- [ ] convertDataToFeature(data)
- [ ] updateFeaturePosition(feature, latlng)
- [ ] getPiecesACreer(geoJsonDraft, etage, appID)
- [ ] reaffectePiecesAuxMarkers(pieces, geoJson)
- [ ] getElementsPositionneesEtNonPositionnees(collection, geoJson)
- [ ] newGeoJsonFeature(datas, latlng)
- [ ] geoJsonDeepCopy(geoJson)
- [ ] exportPiecesACreerExcel(geoJson, etage, fileName?)
- [ ] exportExcel(datas, header?, fileName)
- [ ] importCsv(inputFile)

## PlanMaintenance
- [ ] getPrevventiveMaintenance(focusedDate, metadatas, userId, sites)

## Reponses
- [ ] setConsoJournaliere(tableauRelevesCompteur)
- [ ] isPreviousRegisterResponse(examinedRegisterResponse, releveCompteur)
- [ ] findPreviousRegisterResponse(index, releveCompteur, tableauRelevesCompteur)

## Roles
- [ ] getRoleRules(role)
- [ ] getRoleFromStorage()
- [ ] can(rule)

## SearchDatas
- [ ] search(searchValue, entities?, userId?, sites?)
- [ ] searchEquipements(searchValue, metadatas, userId?, sites?)

## SharedLinks
_(no public methods beyond inherited CRUD)_

## SortieEquipement
- [ ] getTypes(metadatas)

## Statistiques
- [ ] fetchStatistiquesMaintenanceEtat(year, week?, metadatas?)
- [ ] fetchStatistiquesMaintenanceRepartition(metadatas?)
- [ ] fetchStatistiquesVerificationEtat(year, week?, metadatas?)
- [ ] fetchStatistiquesVerificationRepartition(metadatas?)
- [ ] fetchStatistiquesVerificationTemps(year, week?, metadatas?)

## Stocks
- [ ] getDepots(metadatas?)
- [ ] getAll(metadatas)
- [ ] getFiche(idFiche)
- [ ] create(stocks)
- [ ] update(id, bonDeCommande)
- [ ] remove(id)

## Stripe
- [ ] openCustomerPortal()
- [ ] getCustomerState()

## SyntheseMaintenance
- [ ] getSummary(startDate, endDate, metadatas)

## TacheUsers
- [ ] createTacheUsers(tacheUsers, tacheId, userId?)

## Taches
- [ ] getTaches(metadatas, options?)
- [ ] getTache(id)
- [ ] createTaches(taches, restrictionSites?)
- [ ] updateTache(tache, updatedTacheSites?)
- [ ] deleteTache(tache)
- [ ] getExcelFile(metadatas, filename?, fileExtension?)

## Tags
- [ ] listComposantType()

## Tiers
- [ ] getTiers(metadatas, options?)
- [ ] getTiersById(id)
- [ ] updateTier(tier)
- [ ] createTier(tier)
- [ ] deleteTier(tier, userId?)
- [ ] archive(tier)
- [ ] unarchive(tier)

## Verifications
- [ ] getTimeline(verificationId)
- [ ] createVerifications(verifications)
- [ ] startVerification(equipementId, tacheId?, uniquementMesTachesAffectes?)
- [ ] getVerifications(metadatas)
- [ ] getVerificationsReponsesNonConformes(metadatas)
- [ ] getVerificationsReponsesById(idVerification)
- [ ] getProgression(site, metadatas)
- [ ] getVerificationsEquipementsTaches(metadatas)
- [ ] getTacheState(tacheId, site?, metadatas?)
- [ ] getCalendarEvents(metadatas?)
- [ ] getPdfFile(idVerification)
- [ ] addDocumentVerification(verificationId, file)
- [ ] exportHistoriqueTacheRecurrentes(metadatas, fileExtension?, site?)
