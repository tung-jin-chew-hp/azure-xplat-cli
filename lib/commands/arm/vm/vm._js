'use strict';

var utils = require('../../../util/utils');
var VMClient = require('./vmClient');

var $ = utils.getLocaleString;

exports.init = function (cli) {

  var vm = cli.category('vm')
    .description($('Commands to manage your virtual machines'));

  vm.command('create <resourceGroup> <vmName> <nicName> <location> <osType>')
    .description($('Create a VM'))
    .usage('[options] <resourceGroup> <vmName> <nicName> <location> <osType>')
    .option('-q, --image-name <imageName>', $('the image name [image-name and os-disk-* parameters are mutually exclusive]'))
    .option('-u, --admin-username <adminUsername>', $('the user name [valid for VM created from an image (image-name) ignored when VM is based on disk (os-disk-*)]'))
    .option('-p, --admin-password <adminPassword>', $('the password [valid for VM created from an image (image-name) ignored when VM is based on disk (os-disk-*)]'))
    .option('-z, --vm-size <size>', $('the virtual machine size [Standard_A1]'))
    .option('-i, --publicip-name <publicipName>', $('the public ip name'))
    .option('-n, --publicip-domain-name <publicipDomainName>', $('the public ip domain name, this sets the DNS to <publicip-domain-name>.<location>.cloudapp.azure.com'))
    .option('-m, --publicip-allocationmethod <publicipAllocationmethod>', $('the public ip allocation method, valid values are "Dynamic"'))
    .option('-t, --publicip-idletimeout <publicipIdletimeout>', $('the public ip idle timeout specified in minutes'))
    .option('-f, --vnet-name <vnetName>', $('the virtual network name'))
    .option('-g, --vnet-addressprefix <vnetAddressprefix>', $('the virtual network address prefix in IPv4/CIDR format'))
    .option('-j, --vnet-subnet-name <vnetSubnetName>', $('the virtual network subnet name'))
    .option('-k, --vnet-subnet-addressprefix <vnetSubnetAddressprefix>', $('the virtual network subnet address prefix in IPv4/CIDR format'))
    .option('-l, --availset-name <availsetName>', $('the availability set name'))
    .option('-o, --storage-account-name <storageAccountName>', $('the storage account name'))
    .option('-r, --storage-account-container-name <storageAccountContainerName>', $('the storage account container name [vhds]'))
    .option('-c, --os-disk-caching <osDiskCaching>', $('os disk caching, valid values are None, ReadOnly, ReadWrite'))
    .option('-d, --os-disk-vhd <osDiskVhd>', $('name or url of the OS disk Vhd'))
    .option('-a, --data-disk-caching <dataDiskCaching>', $('data disk caching, valid values are None, ReadOnly, ReadWrite'))
    .option('-s, --data-disk-vhd <dataDiskVhd>', $('name or url of the data disk Vhd'))
    .option('-e, --data-disk-size <dataDiskSize>', $('data disk size in GB'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, vmName, nicName, location, osType, options, _) {
     var vmClient = new VMClient(cli, options.subscription);
     vmClient.createVM(resourceGroup, vmName, nicName, location, osType, options, _);
    });

  vm.command('list [resourceGroup]')
    .description($('Lists the virtual machines within a resource group'))
    .usage('[options] [resourceGroup]')
    .option('-g, --resource-group <resourceGroup>', $('the resource group name'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      var vmClient = new VMClient(cli, options.subscription);
      vmClient.listVM(resourceGroup, options, _);
    });

  vm.command('show [resourceGroup] [name]')
    .description($('Gets one virtual machine within a resource group'))
    .usage('[options] [resourceGroup] [name]')
    .option('-g, --resource-group <resourceGroup>', $('the resource group name'))
    .option('-n, --name <name>', $('the virtual machine name'))
    .option('-d, --depth <depth>', $('the number of times to recurse, to recurse indefinitely pass "full". (valid only with --json option)'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual machine name: '), name, _);
      var vmClient = new VMClient(cli, options.subscription);
      vmClient.showVM(resourceGroup, name, options, _);
    });

  vm.command('delete [resourceGroup] [name]')
    .description($('Deletes one virtual machine within a resource group'))
    .usage('[options] [resourceGroup] [name]')
    .option('-g, --resource-group <resourceGroup>', $('the resource group name'))
    .option('-n, --name <name>', $('the virtual machine name'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual machine name: '), name, _);
      var vmClient = new VMClient(cli, options.subscription);
      vmClient.deleteVM(resourceGroup, name, options, _);
    });

  vm.command('stop [resourceGroup] [name]')
    .description($('Shutdown one virtual machine within a resource group'))
    .usage('[options] [resourceGroup] [name]')
    .option('-g, --resource-group <resourceGroup>', $('the resource group name'))
    .option('-n, --name <name>', $('the virtual machine name'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual machine name: '), name, _);
      var vmClient = new VMClient(cli, options.subscription);
      vmClient.stopVM(resourceGroup, name, options, _);
    });

  vm.command('restart [resourceGroup] [name]')
    .description($('Restarts one virtual machine within a resource group'))
    .usage('[options] [resourceGroup] [name]')
    .option('-g, --resource-group <resourceGroup>', $('the resource group name'))
    .option('-n, --name <name>', $('the virtual machine name'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual machine name: '), name, _);
      var vmClient = new VMClient(cli, options.subscription);
      vmClient.restartVM(resourceGroup, name, options, _);
    });

  vm.command('start [resourceGroup] [name]')
    .description($('Starts one virtual machine within a resource group'))
    .usage('[options] [resourceGroup] [name]')
    .option('-g, --resource-group <resourceGroup>', $('the resource group name'))
    .option('-n, --name <name>', $('the virtual machine name'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual machine name: '), name, _);
      var vmClient = new VMClient(cli, options.subscription);
      vmClient.startVM(resourceGroup, name, options, _);
    });

  vm.command('deallocate [resourceGroup] [name]')
    .description($('Shutdown one virtual machine within a resource group and releases the compute resources'))
    .usage('[options] [resourceGroup] [name]')
    .option('-g, --resource-group <resourceGroup>', $('the resource group name'))
    .option('-n, --name <name>', $('the virtual machine name'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual machine name: '), name, _);
      var vmClient = new VMClient(cli, options.subscription);
      vmClient.deallocateVM(resourceGroup, name, options, _);
    });

    var disk = vm.category('disk')
        .description($('Commands to manage your Virtual Machine data disks'));

    disk.command('attach-new <resource-group> <vm-name> <size-in-gb> [vhd-name]')
      .description($('Attach a new data-disk to a VM'))
      .usage('[options] <resource-group> <vm-name> <size-in-gb> [vhd-name]')
      .option('-c, --host-caching <name>', $('the caching behaviour of disk [None, ReadOnly, ReadWrite]'))
      .option('-o, --storage-account-name <storageAccountName>', $('the storage account name'))
      .option('-r, --storage-account-container-name <storageAccountContainerName>', $('the storage account container name [vhds]'))
      .option('-s, --subscription <id>', $('the subscription id'))
      .execute(function(resourceGroup, vmName, size, vhdName, options, _) {
        resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
        vmName = cli.interaction.promptIfNotGiven($('Virtual machine name: '), vmName, _);
        size = cli.interaction.promptIfNotGiven($('Disk size in gb: '), size, _);

        var vmClient = new VMClient(cli, options.subscription);
        vmClient.attachNewDataDisk(resourceGroup, vmName, size, vhdName, options, _);
    });

    disk.command('detach <resource-group> <vm-name> <lun>')
      .description($('Detaches a data-disk attached to a VM'))
      .option('-s, --subscription <id>', $('the subscription id'))
      .execute(function(resourceGroup, vmName, lun, options, _) {
        resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
        vmName = cli.interaction.promptIfNotGiven($('Virtual machine name: '), vmName, _);
        lun = cli.interaction.promptIfNotGiven($('Data disk lun: '), lun, _);

        var vmClient = new VMClient(cli, options.subscription);
        vmClient.detachDataDisk(resourceGroup, vmName, lun, options, _);
    });

    var extension = vm.category('extension')
      .description($('Commands to manage VM resource extensions'));

    extension.command('set <resource-group> <vm-name> <extension-name> <publisher-name> <version>')
      .description($('Enable/disable resource extensions for VMs'))
      .option('-r, --reference-name <name>', $('extension\'s reference name'))
      .option('-i, --public-config <public-config>', $('public configuration text'))
      .option('-c, --public-config-path <public-config-path>', $('public configuration file path'))
      .option('-t, --private-config <private-config>', $('private configuration text'))
      .option('-e, --private-config-path <private-config-path>', $('private configuration file path'))
      .option('-u, --uninstall', $('uninstall extension'))
      .option('-t, --tags <tags>', $('the semicolon separated list of tags'))
      .option('-s, --subscription <id>', $('the subscription id'))
      .execute(function(resourceGroup, vmName, extensionName, publisherName, version, options, _) {
        resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
        vmName = cli.interaction.promptIfNotGiven($('Virtual machine name: '), vmName, _);
        extensionName = cli.interaction.promptIfNotGiven($('VM Extension name: '), extensionName, _);
        publisherName = cli.interaction.promptIfNotGiven($('VM Extension publisher name: '), publisherName, _);
        version = cli.interaction.promptIfNotGiven($('VM Extension version: '), version, _);

        var vmClient = new VMClient(cli, options.subscription);
        vmClient.setExtension(resourceGroup, vmName, extensionName, publisherName, version, options, _);
    });

    extension.command('get <resource-group> <vm-name>')
      .description($('Get VM extensions'))
      .option('-s, --subscription <id>', $('the subscription id'))
      .execute(function(resourceGroup, vmName, options, _) {
        resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
        vmName = cli.interaction.promptIfNotGiven($('Virtual machine name: '), vmName, _);

        var vmClient = new VMClient(cli, options.subscription);
        vmClient.getExtensions(resourceGroup, vmName, options, _);
    });
};