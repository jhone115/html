
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

function initializeSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm && searchInput) {

        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearch();
        });
        

    }
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm.length > 0) {
        performSearch(searchTerm);
    } else {

        showAllCategories();
    }
}

function performSearch(searchTerm) {
    console.log("Buscando:", searchTerm);

    if (!searchIndex || Object.keys(searchIndex).length === 0) {
        showLoadingMessage();
        setTimeout(() => performSearch(searchTerm), 500);
        return;
    }

    const results = {
        pisos: searchIndex.pisos.filter(p => 
            p.title.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        ),
        personajes: searchIndex.personajes.filter(p => 
            p.title.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        ),
        objetos: searchIndex.objetos.filter(o => 
            o.title.toLowerCase().includes(searchTerm) ||
            o.description.toLowerCase().includes(searchTerm)
        )
    };
    
    displaySearchResults(results, searchTerm);
}

function showLoadingMessage() {
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="text-center p-4">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando índice de búsqueda...</p>
            </div>
        `;
    }
}

function displaySearchResults(results, searchTerm) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    let totalResults = Object.values(results).flat().length;
    
    if (totalResults === 0) {
        resultsContainer.innerHTML = `
            <div class="text-center p-4">
                <p>No se encontraron resultados para "<strong>${searchTerm}</strong>"</p>
                <p class="small text-muted">Intenta con otros términos de búsqueda</p>
            </div>
        `;
    } else {
        let resultsHTML = `<p class="text-muted mb-3">Se encontraron ${totalResults} resultados para "<strong>${searchTerm}</strong>"</p>`;

        Object.keys(results).forEach(category => {
            if (results[category].length > 0) {
                const categoryNames = {
                    pisos: "Pisos",
                    personajes: "Personajes", 
                    objetos: "Objetos"
                };
                
                resultsHTML += `
                    <div class="category-results mb-4">
                        <h6 class="category-title border-bottom pb-2 mb-3">
                            ${categoryNames[category]} (${results[category].length})
                        </h6>
                        <div class="row">
                `;
                
                results[category].forEach(item => {
                    resultsHTML += `
                        <div class="col-lg-6 mb-3">
                            <div class="search-result-item h-100 p-3 border rounded" onclick="navigateTo('${item.url}')">
                                <div class="d-flex align-items-start">
                                    <div class="search-item-image me-3">
                                        <img src="${item.image}" alt="${item.title}" 
                                             onerror="this.style.display='none'"
                                             style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1 text-primary">${item.title}</h6>
                                        <p class="mb-1 small text-muted">${categoryNames[category]}</p>
                                        <p class="mb-0 small">${item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                resultsHTML += `</div></div>`;
            }
        });
        
        resultsContainer.innerHTML = resultsHTML;
    }

    showSearchModal();
}

function showAllCategories() {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (!searchIndex || Object.keys(searchIndex).length === 0) {
        showLoadingMessage();
        showSearchModal();
        return;
    }
    
    let resultsHTML = `<p class="text-muted mb-3">Explora por categorías</p>`;
    
    Object.keys(searchIndex).forEach(category => {
        const categoryNames = {
            pisos: "Pisos",
            personajes: "Personajes",
            objetos: "Objetos"
        };
        
        const categoryItems = searchIndex[category] ? searchIndex[category].slice(0, 3) : [];
        
        if (categoryItems.length > 0) {
            resultsHTML += `
                <div class="category-results mb-4">
                    <h6 class="category-title border-bottom pb-2 mb-3">
                        ${categoryNames[category]}
                    </h6>
                    <div class="row">
            `;
            
            categoryItems.forEach(item => {
                resultsHTML += `
                    <div class="col-lg-4 mb-3">
                        <div class="search-result-item h-100 p-3 border rounded" onclick="navigateTo('${item.url}')">
                            <div class="d-flex align-items-start">
                                <div class="search-item-image me-3">
                                    <img src="${item.image}" alt="${item.title}" 
                                         onerror="this.style.display='none'"
                                         style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="mb-1 text-primary">${item.title}</h6>
                                    <p class="mb-0 small">${item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            if (searchIndex[category].length > 3) {
                resultsHTML += `
                    <div class="col-12 text-center mt-2">
                        <button class="btn btn-sm btn-outline-primary" onclick="navigateTo('${getCategoryPage(category)}')">
                            Ver todos los ${categoryNames[category].toLowerCase()} (${searchIndex[category].length})
                        </button>
                    </div>
                `;
            }
            
            resultsHTML += `</div></div>`;
        }
    });
    
    resultsContainer.innerHTML = resultsHTML;
    showSearchModal();
}

function showSearchModal() {
    const searchModalElement = document.getElementById('searchResultsModal');
    if (searchModalElement) {
        const searchModal = new bootstrap.Modal(searchModalElement);
        searchModal.show();
    }
}

function getCategoryPage(category) {
    const categoryPages = {
        pisos: "pisos/pisos.html",
        personajes: "personajes/personajes.html", 
        objetos: "objetos/objetos.html"
    };
    return categoryPages[category] || "#";
}

function navigateTo(url) {
    closeSearchModal();
    window.location.href = url;
}

function closeSearchModal() {
    const searchModalElement = document.getElementById('searchResultsModal');
    if (searchModalElement) {
        const searchModal = bootstrap.Modal.getInstance(searchModalElement);
        if (searchModal) {
            searchModal.hide();
        }
    }
}

window.search = function(term) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = term;
        performSearch(term);
    }
};