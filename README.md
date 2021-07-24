[![Action Status](https://github.com/lukka/get-vcpkg/workflows/build-test/badge.svg)](https://github.com/lukka/get-vcpkg/actions)

# [The **get-vcpkg** action for caching artifacts and using vcpkg on GitHub](https://github.com/marketplace/actions/get-vcpkg)

The **get-vcpkg** action restores from cache [vcpkg](https://github.com/microsoft/vcpkg) along with the previously installed ports. 

 - `vpckg` is assumed to be fetched and checked at at location `${{ github.workspace }}/vcpkg`, or you can set it to whatever you want by fetching it with action/checkout
 - The cache key is computed.
 - The cache key is used to restore `vcpkg` and its previously built binaries from the GitHub cache service.
 - If there was a cache miss, at the end of the workflow the generated binaries are put into the cache associated with the computed cache key.

Good companions are: 
- the [get-cmake](https://github.com/marketplace/actions/get-cmake) action.
- the [run-cmake](https://github.com/marketplace/actions/run-cmake) action.

 ## User Manual
 * [Contributing](#contributing)
 * [Quickstart](#quickstart)
   * [Flowchart](#flowchart)
 * [The <strong>get-vcpkg</strong> action](#get-vcpkg)
 * [Best practices](#best-practices)
    * [Use vcpkg as a submodule of your repository](#use-vcpkg-as-a-submodule-of-your-repository)
    * [Use vcpkg's vcpkg.json file to specify the dependencies](#vcpkgjson)
 * [Action reference: all input/output parameters](#reference)
 * [Samples](#samples)
 * [Projects](#projects)

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md)

## <a id='quickstart'>Quickstart</a>

### <a id='manifest'>Setup vcpkg and use CMake with a vcpkg.json manifest to install dependencies and build your project</a>


```yaml
jobs: 
  build:
    steps:      
      # Install latest CMake.
      - uses: lukka/get-cmake@latest

      TBD
```

### <a id='flowchart'>Flowchart</a>

![get-vcpkg flowchart](https://raw.githubusercontent.com/lukka/get-vcpkg/flowchart.png
)

## <a id='get-vcpkg'>The ***get-vcpkg*** action</a>

Features:
TBD

### <a id='reference'>Action reference: all input/output parameters</a>

Description of all input parameters: [action.yml](https://github.com/lukka/get-vcpkg/blob/main/action.yml)

## Best practices

### <a id='vcpkgsubmodule'>Use **vcpkg** as a submodule of your repository</a>

When using **vcpkg**, be aware of how it works, specifically:
 - a specific version of `vcpkg` must be used either locally and on build servers;
 - a specific version of `vcpkg` is identified by the commit id of the used vcpkg repository;
 - it not possible to choose which version of a port to install, instead it is the used version of `vcpkg` that establishes which version (just one) of a port is available;

 To sum up, **you need to pin the specific version of vcpkg you want to use to keep a consistent development experience between local and remote build environments.** This is accomplished by **using vcpkg as submodule of your Git repository**; this way the version of `vcpkg` used is implied by the commit id specified by the submodule for `vcpkg`.

### <a id='vcpkgjson'>Use vcpkg's vcpkg.json file to specify the dependencies</a>

The [vcpkg.json](https://github.com/microsoft/vcpkg/blob/master/docs/specifications/manifests.md) is a manifest file that declaratively specifies the dependencies to be installed.
The file is being used automatically by running CMake when:
 - starting CMake with the `vcpkg.cmake` toolchain file.
 - the root CMake source directory contains a [vcpkg.json](https://github.com/microsoft/vcpkg/blob/master/docs/specifications/manifests.md) file.

When conditions are satisfied, the toolchain execution starts [vcpkg](https://github.com/microsoft/vcpkg) to install the packages declared in the manifest file.

 *Putting this manifest-like file under source control is highly recommended as this helps to run vcpkg the same exact way locally and remotely on the build servers.**
The dependencies specified in the vcpkg.json file are installed when CMake runs (e.g., at [run-cmake](https://github.com/lukka/run-cmake) time).

## <a id="samples">Samples</a>

TBD

# License

All the content in this repository is licensed under the [MIT License](LICENSE.txt).

Copyright (c) 2021 Luca Cappa

# Donating

Other than submitting a pull request, [donating](paypal.me/lucappa) is another way to contribute to this project.
