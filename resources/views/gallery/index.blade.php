<x-layout>
    <div id="gallery-app" data-token="{{ session('api_token') }}">
        <h1 class="title">Image Gallery</h1>

        {{-- login status --}}
        <p id="login-status" class="text-sm mb-6 text-slate-600"></p>

        {{-- upload form (only shown when logged in) --}}
        <section id="upload-section" class="card mb-8" hidden>
            <h2 id="form-title" class="font-bold mb-4">Publish a new image</h2>

            <div id="form-message" role="status"></div>

            <form id="upload-form" novalidate>
                @csrf

                <div class="mb-4">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" maxlength="255" class="input">
                    <p class="error" data-error-for="title"></p>
                </div>

                <div class="mb-4">
                    <label for="body">Description</label>
                    <textarea id="body" name="body" rows="3" maxlength="5000" class="input"></textarea>
                    <p class="error" data-error-for="body"></p>
                </div>

                <div class="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="filter">Filter</label>
                        <select id="filter" name="filter" class="input">
                            @foreach ($filters as $filter)
                                <option value="{{ $filter }}">{{ ucfirst($filter) }}</option>
                            @endforeach
                        </select>
                        <p class="error" data-error-for="filter"></p>
                    </div>

                    <div>
                        <label for="image">Image (png, jpg or webp, max 3MB)</label>
                        <input type="file" id="image" name="image" accept=".png,.jpg,.jpeg,.webp"
                            class="mt-1 file:mr-4 file:py-2 file:px-4 file:text-sm file:font-semibold file:bg-gray-200 hover:file:bg-blue-100">
                        <p class="error" data-error-for="image"></p>
                    </div>
                </div>

                {{-- live preview with the chosen filter --}}
                <figure id="preview" class="mb-4" hidden>
                    <img id="preview-image" src="" alt="Preview of the selected image" class="h-48 rounded-md object-cover">
                    <figcaption class="text-xs text-slate-500 mt-1">Preview with filter</figcaption>
                </figure>

                {{-- upload progress --}}
                <progress id="upload-progress" class="w-full mb-4" max="100" value="0" hidden></progress>

                <div class="flex gap-4">
                    <button type="submit" id="submit-button" class="btn">Publish</button>
                    <button type="button" id="cancel-edit" class="btn bg-slate-400 hover:bg-slate-500" hidden>Cancel edit</button>
                </div>
            </form>
        </section>

        {{-- tabs --}}
        <nav class="flex flex-wrap items-center gap-2 mb-4" aria-label="Gallery views">
            <button type="button" class="tab" data-view="latest">Latest</button>
            <button type="button" class="tab" data-view="mine">My images</button>
            <button type="button" class="tab" data-view="users">Other users</button>

            <select id="filter-select" class="input w-auto! mt-0!" aria-label="Show only one filter">
                <option value="">All filters</option>
                @foreach ($filters as $filter)
                    <option value="{{ $filter }}">{{ ucfirst($filter) }}</option>
                @endforeach
            </select>

            <select id="user-select" class="input w-auto! mt-0!" aria-label="Choose a user" hidden></select>
        </nav>

        <p id="gallery-message" class="text-sm text-slate-600 mb-4"></p>

        <div id="gallery" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>

        <div class="text-center mt-6">
            <button type="button" id="load-more" class="btn w-auto! px-6" hidden>Load more</button>
        </div>
    </div>

    @vite('resources/js/gallery/main.js')
</x-layout>
